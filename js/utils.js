import {
  ALERT_SHOW_TIME,
  PIN_DEFAULT_LAT,
  PIN_DEFAULT_LNG,
  LOW_PRICE,
  MIDDLE_PRICE,
  TYPE_PLACEHOLDER,
  CAPACITY_DEFAULT_VALUE,
  TIMEOUT_DEFAULT_VALUE
} from './constants.js';
import { adFormElement, adCapacityElement, adTimeoutElement } from './form-processing.js';
import { map, mainPinMarker } from './main.js';
import { onSuccessMessageClick, onSuccessMessageEscKyedown as onSuccessMessageEscKeydown } from './api.js';

const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeFilterElement =
  mapFiltersElement.querySelector('#housing-type');
const housingPriceFilterElement =
  mapFiltersElement.querySelector('#housing-price');
const housingRoomsFilterElement =
  mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsFilterElement =
  mapFiltersElement.querySelector('#housing-guests');

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

  map.setView(
    {
      lat: PIN_DEFAULT_LAT,
      lng: PIN_DEFAULT_LNG,
    },
    10,
  );
  adFormElement.reset();
  adFormElement.querySelector('#price').placeholder = TYPE_PLACEHOLDER.flat;
  adCapacityElement.querySelectorAll('option').forEach((item) => {
    if (item.value !== CAPACITY_DEFAULT_VALUE) {
      item.removeAttribute('selected');
    } else {
      item.removeAttribute('disabled');
      item.setAttribute('selected', 'selected');
    }
  });
  adTimeoutElement.querySelectorAll('option').forEach((item) => {
    if (item.value !== TIMEOUT_DEFAULT_VALUE) {
      item.removeAttribute('selected');
    } else {
      item.removeAttribute('disabled');
      item.setAttribute('selected', 'selected');
    }
  });
  document.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const compareTypes = (offer) => {
  if (
    housingTypeFilterElement.value === 'any' ||
    offer.offer.type === housingTypeFilterElement.value
  ) {
    return offer;
  }
};

const comparePrice = (offer) => {
  if (housingPriceFilterElement.value === 'any') {
    return offer;
  } else if (
    housingPriceFilterElement.value === 'low' &&
    offer.offer.price < LOW_PRICE
  ) {
    return offer;
  } else if (
    housingPriceFilterElement.value === 'middle' &&
    offer.offer.price >= LOW_PRICE &&
    offer.offer.price < MIDDLE_PRICE
  ) {
    return offer;
  } else if (
    housingPriceFilterElement.value === 'high' &&
    offer.offer.price >= MIDDLE_PRICE
  ) {
    return offer;
  }
};

const compareRooms = (offer) => {
  if (housingRoomsFilterElement.value === 'any' && offer.offer.rooms > 3) {
    return offer;
  } else if (offer.offer.rooms === +housingRoomsFilterElement.value) {
    return offer;
  }
};

const compareGuests = (offer) => {
  if (housingGuestsFilterElement.value === 'any' && offer.offer.guests > 2) {
    return offer;
  } else if (offer.offer.guests === +housingGuestsFilterElement.value) {
    return offer;
  }
};

const getOfferRank = (offer) => {
  const filterFeaturesElements = document.querySelectorAll(
    '#housing-features input',
  );
  let rank = 0;
  filterFeaturesElements.forEach((element) => {
    if (
      element.checked &&
      offer.offer.features &&
      offer.offer.features.includes(element.value)
    ) {
      rank += 1;
    }
  });
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);
  return rankB - rankA;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  debounce,
  showAlert,
  setToDefault,
  isEscEvent,
  compareTypes,
  comparePrice,
  compareRooms,
  compareGuests,
  compareOffers
};
