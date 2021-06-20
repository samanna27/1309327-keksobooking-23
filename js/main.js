const ADVERTISEMENT_COUNT=10;
const TYPES =[
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS =[
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS =[
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES =[
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS =[
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN=1;
const MAX=1000;
const latMIN=35.65000;
const latMAX=35.70000;
const LAT_LNG_PRECISION=5;
const lngMIN=139.70000;
const lngMAX=139.80000;
const minLENGTH=1;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomPositiveFloat = (min, max, digits = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0,elements.length-1)];
const getRandomArrayElements = (elements, count) => {
  const elementsCopy=elements.slice();
  let result=[];
  for (let index=0; index<count; index++) {
    const randomIndex=getRandomPositiveInteger(0,elementsCopy.length-1);
    const removed=elementsCopy.splice(randomIndex,1);
    result=result.concat(removed);
  }
  return result;
};

const avatarNumber = () => {
  const index=getRandomPositiveInteger(1,10);
  return (index===10)? `${index}`: `0${index}`;
};

const createAdvertisementObject = () => {
  const lat=getRandomPositiveFloat (latMIN, latMAX, LAT_LNG_PRECISION);
  const lng=getRandomPositiveFloat (lngMIN, lngMAX, LAT_LNG_PRECISION);
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
      features: getRandomArrayElements(FEATURES,getRandomPositiveInteger(minLENGTH,FEATURES.length-1)),
      description: 'Есть все необходимое для полноценного проживания!',
      photos: getRandomArrayElements(PHOTOS,getRandomPositiveInteger(minLENGTH,PHOTOS.length-1)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const getArrayofAdvertisementObjects = new Array (ADVERTISEMENT_COUNT).fill(null).map(()=>createAdvertisementObject());

console(getArrayofAdvertisementObjects);
