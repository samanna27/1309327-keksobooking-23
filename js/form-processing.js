import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TYPE_MIN_PRICE,
  TYPE_PLACEHOLDER,
  FILE_TYPES,
  MAX_PRICE,
  PHOTO_WIDTH,
  PHOTO_HEIGHT,
  ROOM_NUMBER_MAX,
  CAPACITY_NOT_FOR_GUESTS
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

const onAdFormAvatarElementChange = () => {
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
};

adFormAvatarElement.addEventListener('change', onAdFormAvatarElementChange);

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
      item.removeAttribute('selected');
    } else {
      item.setAttribute('selected', 'selected');
    }
  });
});

adTimeoutElement.addEventListener('change', (evt) => {
  const value = evt.target.value;
  const adTimeinElementOptionArray = adTimeinElement.querySelectorAll('option');
  adTimeinElementOptionArray.forEach((item) => {
    if (item.value !== value) {
      item.removeAttribute('selected');
    } else {
      item.setAttribute('selected', 'selected');
    }
  });
});

const filterChangeHandler = function (evt) {
  const value = evt.target.value;
  if (value === ROOM_NUMBER_MAX) {
    if (adCapacityElement.value !== CAPACITY_NOT_FOR_GUESTS) {
      adCapacityElement.setCustomValidity('Для опции 100 комнат можно выбрать только Не для гостей');
    } else {
      adCapacityElement.setCustomValidity('');
    }
  } else if (value !== ROOM_NUMBER_MAX) {
    if (adCapacityElement.value === CAPACITY_NOT_FOR_GUESTS) {
      adCapacityElement.setCustomValidity('Не для гостей можно выбрать только для опции 100 комнат');
    } else if (adCapacityElement.value > value) {
      adCapacityElement.setCustomValidity('Количество гостей не может быть больше количества комнат');
    } else {
      adCapacityElement.setCustomValidity('');
    }
  }

  adCapacityElement.reportValidity();
};

const filterCapacityChangeHandler = function (evt) {
  const value = evt.target.value;
  if (value === CAPACITY_NOT_FOR_GUESTS) {
    if (adRoomNumberElement.value !== ROOM_NUMBER_MAX) {
      adCapacityElement.setCustomValidity('Не для гостей можно выбрать только для опции 100 комнат');
    } else {
      adCapacityElement.setCustomValidity('');
    }
  } else if (value !== CAPACITY_NOT_FOR_GUESTS) {
    if (adRoomNumberElement.value === ROOM_NUMBER_MAX) {
      adCapacityElement.setCustomValidity('Не для гостей можно выбрать только для опции 100 комнат');
    } else if (value > adRoomNumberElement.value) {
      adCapacityElement.setCustomValidity('Количество гостей не может быть больше количества комнат');
    } else {
      adCapacityElement.setCustomValidity('');
    }
  }

  adCapacityElement.reportValidity();
};

adRoomNumberElement.addEventListener('change', filterChangeHandler);
adCapacityElement.addEventListener('change', filterCapacityChangeHandler);

const photoPreviewElement = document.createElement('img');
photoPreviewElement.width = PHOTO_WIDTH;
photoPreviewElement.height = PHOTO_HEIGHT;
uploadPhotoPreviewElement.insertAdjacentElement('beforeend', photoPreviewElement);

const onAdFormUploadElementChange = () => {
  const file = adFormUploadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photoPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

adFormUploadElement.addEventListener('change', onAdFormUploadElementChange);

export {
  inactivateForm,
  activateForm,
  adFormElement,
  adCapacityElement,
  adTimeinElement,
  adTimeoutElement,
  activateFilter,
  previewElement,
  photoPreviewElement
};
