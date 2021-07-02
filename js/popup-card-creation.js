import { getArrayofAdvertisementObjects } from './data.js';
import { TYPESMODIFIER } from './constants.js';

const offers = getArrayofAdvertisementObjects;
const cardTemplate = document.querySelector('#card').content;
const popupElement = cardTemplate.querySelector('.popup');
const mapCanvasElement = document.querySelector('#map-(canvas');
const offerElement = offers.slice(0, offers.length - (offers.length - 1));

// eslint-disable-next-line no-console
console.log (offerElement);

offerElement.forEach((offer) => {
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
  offerElementPhotoArray.forEach(() => {
    const popupPhotosListElement =
      newPopupElement.querySelector('.popup__photos');
    const popupPhotoElementClone = popupPhotosListElement.querySelector('.popup__photo').cloneNode(true);
    popupPhotoElementClone.src = offer.offer.photos;
    popupPhotosListElement.appendChild(popupPhotoElementClone);
  });

  const popupAvatarElement = newPopupElement.querySelector('.popup__avatar');
  if (offer.author.avatar) {
    popupAvatarElement.src = offer.author.avatar;
  } else {
    popupAvatarElement.remove();
  }

  mapCanvasElement.appendChild(newPopupElement);

  // eslint-disable-next-line no-console
  console.log(newPopupElement);
});

export { mapCanvasElement as offersList };
