import { ALERT_SHOW_TIME } from './constants.js';
import { PIN_DEFAULT_LAT, PIN_DEFAULT_LNG } from './constants.js';
import { adFormElement } from './form-processing.js';
import { map, mainPinMarker } from './main.js';

const addressElement = adFormElement.querySelector('#address');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const setToDefault = function () {
  mainPinMarker.setLatLng({
    lat: PIN_DEFAULT_LAT,
    lng: PIN_DEFAULT_LNG,
  });

  map.setView({
    lat: PIN_DEFAULT_LAT,
    lng: PIN_DEFAULT_LNG,
  },
  10,
  );
  adFormElement.reset();
  addressElement.value = `${PIN_DEFAULT_LAT}, ${PIN_DEFAULT_LNG}`;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { showAlert, setToDefault, isEscEvent };
