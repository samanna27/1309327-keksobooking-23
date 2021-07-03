const inactivateForm = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.add('ad-form--disabled');
  const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  adFormFieldsetElements.forEach ((item) => {
    item.setAttribute('disabled', 'disabled');
  });

  const mapFiletrsElement = document.querySelector('.map__filters');
  mapFiletrsElement.classList.add('map__filters--disabled');
  const mapFilterInteractiveElements = mapFiletrsElement.querySelectorAll('.map__filter');
  mapFilterInteractiveElements.forEach ((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  const mapFieldsetElement = mapFiletrsElement.querySelector('fieldset');
  mapFieldsetElement.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('ad-form--disabled');
  const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  adFormFieldsetElements.forEach ((item) => {
    item.removeAttribute('disabled');
  });

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.remove('map__filters--disabled');
  const mapFilterInteractiveElements = mapFiltersElement.querySelectorAll('.map__filter');
  mapFilterInteractiveElements.forEach ((item) => {
    item.removeAttribute('disabled');
  });
  const mapFieldsetElement = mapFiltersElement.querySelector('fieldset');
  mapFieldsetElement.removeAttribute('disabled');
};

export {inactivateForm, activateForm};
