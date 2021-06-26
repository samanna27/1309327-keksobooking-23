import { getArrayofAdvertisementObjects } from './data';
import { TYPESMODIFIER } from './constants';
// import { createOfferForm } from './creation-similar-offers';

const offers = getArrayofAdvertisementObjects(1);
const offerElement = offers[0];
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');
const offersList = document.querySelector ('#map-canvas');

// const createOfferForm = function (offer) {
const newOffer = newCardTemplate.cloneNode (true);
const offerTitle = newOffer.querySelector ('.popup__title');
offerTitle.textContent = offerElement.offer.title;
const offerAddress = newOffer.querySelector ('.popup__text--address');
offerAddress.textContent = offerElement.offer.address;
const offerPrice = newOffer.querySelector ('.popup__text--price');
offerPrice.textContent = `${offerElement.offer.price} ₽/ночь`;
const offerType = newOffer.querySelector ('.popup__type');
offerType.textContent = TYPESMODIFIER[offerElement.offer.type];
const offerRoomsGuests = newOffer.querySelector ('.popup__text--capacity');
offerRoomsGuests.textContent = `${offerElement.offer.rooms} комнаты для ${offerElement.offer.guests} гостей`;
offersList.appendChild (newOffer);
const offerCheckinChecout = newOffer.querySelector('.popup__text--time');
offerCheckinChecout.textContent = `Заезд после ${offerElement.offer.checkin}, выезд до ${offerElement.offer.checkout}`;
const offerFeatures = newOffer.querySelector('.popup__features');
const featuresModifiers = offerElement.offer.features.map((feature) => `popup__feature--${feature}`);
offerFeatures.querySelectorALL('popup__feature').forEach((item) => {
  const modifier = item.classList[1];
  if (!featuresModifiers.includes(modifier)) {
    item.remove();
  }
});
const offerDescription = newOffer.querySelector('.popup__description');
offerDescription.textContent = offerElement.offer.description;
const offerPhotos = newOffer.querySelector('.popup__photos');
const photo = offerPhotos.querySelector('.popup__photo');
for (let i=0; i<offerElement.offer.photos.length; i++) {
  offerPhotos.child[i].src = offerElement.offer.photos[i];
  if (offerElement.offer.photos.length>i++) {
    offerPhotos.appendChild(photo.cloneNode());
  }
}
const offerAvatarPhoto = newOffer.querySelector('popup__avatar');
offerAvatarPhoto.src = offerElement.author.avatar;
offersList.appendChild(newOffer);
//   console (newOffer);
// };
