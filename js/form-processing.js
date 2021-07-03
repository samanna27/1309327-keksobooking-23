const inactivateForm = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.add('ad-form--disabled');
  const formInteractiveElements = adFormElement.querySelectorAll('fieldset');
  formInteractiveElements.forEach ((item) => {
    item.setAttribute('disabled', 'disabled');
  });

  const mapElement = document.querySelector('.map__filters');
  mapElement.classList.add('map__filters--disabled');
  const mapInteractiveElements = mapElement.querySelectorAll('.map__filter');
  mapInteractiveElements.forEach ((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  const mapFieldsetElement = mapElement.querySelector('fieldset');
  mapFieldsetElement.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  const adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('ad-form--disabled');
  const formInteractiveElements = adFormElement.querySelectorAll('fieldset');
  formInteractiveElements.forEach ((item) => {
    item.removeAttribute('disabled');
  });

  const mapElement = document.querySelector('.map__filters');
  mapElement.classList.remove('map__filters--disabled');
  const mapInteractiveElements = mapElement.querySelectorAll('.map__filter');
  mapInteractiveElements.forEach ((item) => {
    item.removeAttribute('disabled');
  });
  const mapFieldsetElement = mapElement.querySelector('fieldset');
  mapFieldsetElement.removeAttribute('disabled');
};

export {inactivateForm, activateForm};
