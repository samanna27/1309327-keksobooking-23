const ADVERTISEMENT_COUNT = 10;
const TYPESMODIFIER = {
  palace: 'Дворец',
  flat: 'Квратира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: '10000',
};
const TYPE_PLACEHOLDER = {
  bungalow: '0',
  flat: '1 000',
  hotel: '3 000',
  house: '5 000',
  palace: '10 000',
};
const PIN_DEFAULT_LAT = 35.7;
const PIN_DEFAULT_LNG = 139.6;
const ALERT_SHOW_TIME = 5000;

export {
  ADVERTISEMENT_COUNT,
  TYPESMODIFIER,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TYPE_MIN_PRICE,
  TYPE_PLACEHOLDER,
  PIN_DEFAULT_LAT,
  PIN_DEFAULT_LNG,
  ALERT_SHOW_TIME
};
