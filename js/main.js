import {
  inactivateForm,
  activateForm,
  adFormElement
} from './form-processing.js';
import { getArrayofAdvertisementObjects } from './data.js';
import { TYPESMODIFIER, PIN_DEFAULT_LAT, PIN_DEFAULT_LNG } from './constants.js';

const addressElement = adFormElement.querySelector('#address');
const resetButtonElement = document.querySelector('.ad-form__reset');

inactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    addressElement.value = `${PIN_DEFAULT_LAT}, ${PIN_DEFAULT_LNG}`;
  })
  .setView(
    {
      lat: PIN_DEFAULT_LAT,
      lng: PIN_DEFAULT_LNG,
    },
    10,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: PIN_DEFAULT_LAT,
    lng: PIN_DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinateLat = coordinates.lat.toFixed(5);
  const coordinateLng = coordinates.lng.toFixed(5);
  addressElement.value = `${coordinateLat}, ${coordinateLng}`;
});

const adPinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

resetButtonElement.addEventListener('click', () => {
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
});

const offers = getArrayofAdvertisementObjects;

const createCustomPopup = (offer) => {
  const cardTemplate = document.querySelector('#card').content;
  const popupElement = cardTemplate.querySelector('.popup');

  const newPopupElement = popupElement.cloneNode(true);

  const popupTitleElement = newPopupElement.querySelector('.popup__title');
  if (offer.offer.title) {
    popupTitleElement.textContent = offer.offer.title;
  } else {
    popupTitleElement.remove();
  }

  const popupAddressElement = newPopupElement.querySelector(
    '.popup__text--address',
  );
  if (offer.offer.address) {
    popupAddressElement.textContent = offer.offer.address;
  } else {
    popupAddressElement.remove();
  }

  const popupPriceElement = newPopupElement.querySelector(
    '.popup__text--price',
  );
  if (offer.offer.price) {
    popupPriceElement.textContent = `${offer.offer.price} ₽/ночь`;
  } else {
    popupPriceElement.remove();
  }

  const popupTypeElement = newPopupElement.querySelector('.popup__type');
  if (offer.offer.type) {
    popupTypeElement.textContent = TYPESMODIFIER[offer.offer.type];
  } else {
    popupTypeElement.remove();
  }

  const popupCapacityElement = newPopupElement.querySelector(
    '.popup__text--capacity',
  );
  if (offer.offer.crooms || offer.offer.guests) {
    popupCapacityElement.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  } else {
    popupCapacityElement.remove();
  }

  const popupTimeElement = newPopupElement.querySelector('.popup__text--time');
  if (offer.offer.checkin || offer.offer.checkout) {
    popupTimeElement.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  } else {
    popupTimeElement.remove();
  }

  const popupFeaturesElement =
    newPopupElement.querySelector('.popup__features');
  const featuresModifiers = offer.offer.features.map(
    (feature) => `popup__feature--${feature}`,
  );
  if (featuresModifiers) {
    popupFeaturesElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!featuresModifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    popupFeaturesElement.remove();
  }

  const popupDescriptionElement = newPopupElement.querySelector(
    '.popup__description',
  );
  if (offer.offer.description) {
    popupDescriptionElement.textContent = offer.offer.description;
  } else {
    popupDescriptionElement.remove();
  }

  const offerElementPhotoArray = offer.offer.photos;
  const popupPhotosListElement =
    newPopupElement.querySelector('.popup__photos');
  if (offerElementPhotoArray) {
    offerElementPhotoArray.forEach((item) => {
      const popupPhotoElementClone = popupPhotosListElement
        .querySelector('.popup__photo')
        .cloneNode(true);
      popupPhotoElementClone.src = item;
      popupPhotosListElement.appendChild(popupPhotoElementClone);
    });
  } else {
    popupPhotosListElement.remove();
  }
  const popupPhotosListElementImagesArray =
    popupPhotosListElement.querySelectorAll('.popup__photo');
  popupPhotosListElementImagesArray[0].remove();

  const popupAvatarElement = newPopupElement.querySelector('.popup__avatar');
  if (offer.author.avatar) {
    popupAvatarElement.src = offer.author.avatar;
  } else {
    popupAvatarElement.remove();
  }

  return newPopupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const lat = offer.location.lat;
  const lng = offer.location.lng;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: adPinIcon,
    },
  );

  marker.addTo(markerGroup).bindPopup(createCustomPopup(offer), {
    keepInView: true,
  });
};

offers.forEach((offer) => {
  createMarker(offer);
});
