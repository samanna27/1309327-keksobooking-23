import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TYPE_MIN_PRICE,
  TYPE_PLACEHOLDER,
  FILE_TYPES,
  MAX_PRICE
} from './constants.js';

const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterInteractiveElements =
  mapFiltersElement.querySelectorAll('.map__filter');
const mapFieldsetElement = mapFiltersElement.querySelector('fieldset');
const adTitleElement = adFormElement.querySelector('#title');
const adPriceElement = adFormElement.querySelector('#price');
const adRoomNumberElement = adFormElement.querySelector('#room_number');
const adCapacityElement = adFormElement.querySelector('#capacity');
const adTypeElement = adFormElement.querySelector('#type');
const adTimeinElement = adFormElement.querySelector('#timein');
const adTimeoutElement = adFormElement.querySelector('#timeout');
const adFormAvatarElement = document.querySelector(
  '.ad-form__field input[type=file]');
const previewElement = document.querySelector('.ad-form-header__preview img');
const adFormUploadElement = document.querySelector(
  '.ad-form__upload input[type=file]');
const uploadPhotoPreviewElement = document.querySelector('.ad-form__photo');

const inactivateForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFormFieldsetElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });

  mapFiltersElement.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  mapFieldsetElement.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormFieldsetElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

const activateFilter = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
  mapFieldsetElement.removeAttribute('disabled');
};

// adFormElement.addEventListener('change', () => {
adFormAvatarElement.addEventListener('change', () => {
  const file = adFormAvatarElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

adTitleElement.addEventListener('input', () => {
  const valueLength = adTitleElement.value.length;

  if (valueLength > 0 && valueLength < MIN_TITLE_LENGTH) {
    adTitleElement.setCustomValidity(
      `Заголовок должен состоять минимум из 30 символов${'.'} Осталось ещё ${
        MIN_TITLE_LENGTH - valueLength
      } симв.`    );
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitleElement.setCustomValidity(
      `Заголовок не должен превышать 100 символов${'.'} Удалите лишние ${
        valueLength - MAX_TITLE_LENGTH
      } симв.`    );
  } else if (valueLength === 0) {
    adTitleElement.setCustomValidity('Обязательное поле');
  } else {
    adTitleElement.setCustomValidity('');
  }

  adTitleElement.reportValidity();
});

const priceInputHandler = () => {
  adPriceElement.addEventListener('input', (evt) => {
    const value = adPriceElement.value;
    const type = adTypeElement.value;
    const minPrice = TYPE_MIN_PRICE[type];
    const valueLength = adPriceElement.value.length;
    evt.target.min = minPrice;

    if (value > MAX_PRICE) {
      adPriceElement.setCustomValidity('Цена не может быть больше 1 000 000');
    } else if (valueLength === 0) {
      adPriceElement.setCustomValidity('Обязательное поле');
    } else if (value < minPrice) {
      adPriceElement.setCustomValidity(`Минимальная цена ${minPrice}`);
    } else {
      adPriceElement.setCustomValidity('');
    }

    adPriceElement.reporValidity;
  });
};

priceInputHandler();

adTypeElement.addEventListener('change', () => {
  adPriceElement.value = '';
  const type = adTypeElement.value;
  const minPrice = TYPE_MIN_PRICE[type];
  const pricePlaceholder = TYPE_PLACEHOLDER[type];

  adPriceElement.placeholder = pricePlaceholder;
  adPriceElement.min = minPrice;
});

adTimeinElement.addEventListener('change', (evt) => {
  const value = evt.target.value;
  const adTimeoutElementOptionArray =
    adTimeoutElement.querySelectorAll('option');
  adTimeoutElementOptionArray.forEach((item) => {
    if (item.value !== value) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected');
    } else {
      item.removeAttribute('disabled');
      item.setAttribute('selected', 'selected');
    }
  });
});

adTimeoutElement.addEventListener('change', (evt) => {
  const value = evt.target.value;
  const adTimeinElementOptionArray = adTimeinElement.querySelectorAll('option');
  adTimeinElementOptionArray.forEach((item) => {
    if (item.value !== value) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected');
    } else {
      item.removeAttribute('disabled');
      item.setAttribute('selected', 'selected');
    }
  });
});

const filterChangeHandler = function (evt) {
  const value = evt.target.value;
  const adCapacityElementOptionArray =
    adCapacityElement.querySelectorAll('option');
  if (value === '100') {
    adCapacityElementOptionArray.forEach((item) => {
      if (item.value !== '0') {
        item.setAttribute('disabled', 'disabled');
        item.removeAttribute('selected');
      } else {
        item.removeAttribute('disabled');
        item.setAttribute('selected', 'selected');
      }
    });
  } else if (value !== '100') {
    adCapacityElementOptionArray.forEach((item) => {
      item.removeAttribute('disables');
    });
    adCapacityElementOptionArray.forEach((item) => {
      if (item.value === '0') {
        item.setAttribute('disabled', 'disabled');
        item.removeAttribute('selected');
      } else if (item.value < value) {
        item.removeAttribute('disabled');
        item.removeAttribute('selected', 'selected');
      } else if (item.value > value) {
        item.setAttribute('disabled', 'disabled');
        item.removeAttribute('selected');
      } else {
        item.removeAttribute('disabled');
        item.setAttribute('selected', 'selected');
      }
    });
  }
};

adRoomNumberElement.addEventListener('change', filterChangeHandler);

adFormUploadElement.addEventListener('change', () => {
  const file = adFormUploadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const photoPreviewElement = previewElement.cloneNode(true);
      uploadPhotoPreviewElement.appendChild(photoPreviewElement);
      photoPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

// });

export {
  inactivateForm,
  activateForm,
  adFormElement,
  adCapacityElement,
  adTimeoutElement,
  activateFilter
};
