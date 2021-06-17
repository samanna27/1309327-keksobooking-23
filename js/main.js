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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0,elements.length-1)];

const avatarNumber = () =>{
  const index=getRandomPositiveInteger(1,10);
  // eslint-disable-next-line prefer-template
  return (index===10)? index.toString: '0'+index;
};

const createAdvertisementObject = () => {
  return {
    author: {
      avatar: 'img/avatars/user'+avatarNumber+'.png',
    },
    offer: {
      title: 'Сдается в аренду.',
      address: location.lat.toString + location.lng.toString,
      price: getRandomPositiveInteger(MIN, MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(MIN, MAX),
      guests: getRandomPositiveInteger(MIN, MAX),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: new Array(getRandomPositiveInteger(0,FEATURES.length-1)).fill(null).map(getRandomArrayElement(FEATURES))
      ,
      description: 'Есть все необходимое для полноценного проживания!',
      photos: new Array(getRandomPositiveInteger(0,PHOTOS.length-1)).fill(null).map(getRandomArrayElement(PHOTOS)),
    },
    location: {
      lat: getRandomPositiveFloat (latMIN, latMAX, digits = LAT_LNG_PRECISION),
      lng: getRandomPositiveFloat (lngMIN, lngMAX, digits = LAT_LNG_PRECISION),
    },
  };
};

const getArrayofAdvertisementObjects = new Array (ADVERTISEMENT_COUNT).fill(null).map(()=>createAdvertisementObject());
