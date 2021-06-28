import { getArrayofAdvertisementObjects } from './data.js';
import { TYPESMODIFIER } from './constants.js';

const offers = getArrayofAdvertisementObjects;
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');
const offersList = document.querySelector('#map-canvas');

for (let j = 0; j < offers.length-9; j++) {
  const offerElement = offers[j];
  const newOffer = newCardTemplate.cloneNode(true);

  const offerTitle = newOffer.querySelector('.popup__title');
  offerTitle.textContent = offerElement.offer.title;

  const offerAddress = newOffer.querySelector('.popup__text--address');
  offerAddress.textContent = offerElement.offer.address;

  const offerPrice = newOffer.querySelector('.popup__text--price');
  offerPrice.textContent = `${offerElement.offer.price} ₽/ночь`;

  const offerType = newOffer.querySelector('.popup__type');
  offerType.textContent = TYPESMODIFIER[offerElement.offer.type];

  const offerRoomsGuests = newOffer.querySelector('.popup__text--capacity');
  offerRoomsGuests.textContent = `${offerElement.offer.rooms} комнаты для ${offerElement.offer.guests} гостей`;

  const offerCheckinChecout = newOffer.querySelector('.popup__text--time');
  offerCheckinChecout.textContent = `Заезд после ${offerElement.offer.checkin}, выезд до ${offerElement.offer.checkout}`;

  const offerFeatures = newOffer.querySelector('.popup__features');
  const featuresModifiers = offerElement.offer.features.map(
    (feature) => `popup__feature--${feature}`,
  );
  offerFeatures.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (!featuresModifiers.includes(modifier)) {
      item.remove();
    }
  });

  const offerDescription = newOffer.querySelector('.popup__description');
  offerDescription.textContent = offerElement.offer.description;

  const offerPhotos = newOffer.querySelector('.popup__photos');
  for (let i = offerElement.offer.photos.length; i >= 0 ; i--) {
    offerPhotos.childNodes[i].src = offerElement.offer.photos[i-1];
    while (offerElement.offer.photos.length > offerPhotos.children.length) {
      const photo = offerPhotos.querySelector('.popup__photo');
      offerPhotos.appendChild(photo.cloneNode(true));
    }
  }

  const offerAvatarPhoto = newOffer.querySelector('.popup__avatar');
  offerAvatarPhoto.src = offerElement.author.avatar;

  // const authorObj = Object.values(offerElement.author);
  // const offer = Object.values(offerElement.offer);
  // const location = Object.values(offerElement.location);
  // const hideEmptyElements = function getKeyByValue(object, value) {
  //   const keyName = Object.keys(object).find(() => object.key === value);
  //   newOffer.querySelector(`.popup__${keyName}`).classList.add('hidden');
  // };
  // hideEmptyElements (authorObj, undefined);
  // hideEmptyElements (offer, undefined);
  // hideEmptyElements (location, undefined);

  offersList.appendChild(newOffer);
}

export { offersList };
