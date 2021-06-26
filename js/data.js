import {
  ADVERTISEMENT_COUNT,
  TYPES,
  CHECKINS,
  CHECKOUTS,
  FEATURES,
  PHOTOS,
  MIN,
  MAX,
  LATMIN,
  LATMAX,
  LAT_LNG_PRECISION,
  LNGMIN,
  LNGMAX,
  MINLENGTH,
  AVATARMININDEX,
  AVATARMAXINDEX
} from './constants.js';
import { getRandomPositiveInteger } from './utils.js';
import { getRandomPositiveFloat } from './utils.js';

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayElements = (elements, count) => {
  const elementsCopy = elements.slice();
  let result = [];
  for (let index = 0; index < count; index++) {
    const randomIndex = getRandomPositiveInteger(0, elementsCopy.length - 1);
    const removed = elementsCopy.splice(randomIndex, 1);
    result = result.concat(removed);
  }
  return result;
};

const avatarNumber = () => {
  const index = getRandomPositiveInteger(AVATARMININDEX, AVATARMAXINDEX);
  return index === AVATARMAXINDEX ? `${index}` : `0${index}`;
};

const createAdvertisementObject = () => {
  const lat = getRandomPositiveFloat(LATMIN, LATMAX, LAT_LNG_PRECISION);
  const lng = getRandomPositiveFloat(LNGMIN, LNGMAX, LAT_LNG_PRECISION);
  return {
    author: {
      avatar: `img/avatars/user${avatarNumber()}.png`,
    },
    offer: {
      title: 'Сдается в аренду.',
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(MIN, MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(MIN, MAX),
      guests: getRandomPositiveInteger(MIN, MAX),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArrayElements(FEATURES, getRandomPositiveInteger(MINLENGTH, FEATURES.length - 1)),
      description: 'Есть все необходимое для полноценного проживания!',
      photos: getRandomArrayElements(PHOTOS, getRandomPositiveInteger(MINLENGTH, PHOTOS.length - 1)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const getArrayofAdvertisementObjects = new Array(ADVERTISEMENT_COUNT)
  .fill(null)
  .map(() => createAdvertisementObject());

console(getArrayofAdvertisementObjects);

export {getArrayofAdvertisementObjects};
