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
const PIN_DEFAULT_LAT = 35.6895.toFixed(5);
const PIN_DEFAULT_LNG = 139.692.toFixed(5);
const ALERT_SHOW_TIME = 5000;
const LOW_PRICE = 10000;
const MIDDLE_PRICE = 50000;
const RERENDER_DELAY = 500;
const CAPACITY_DEFAULT_VALUE = '1';
const TIMEOUT_DEFAULT_VALUE = '12:00';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export {
  ADVERTISEMENT_COUNT,
  TYPESMODIFIER,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  TYPE_MIN_PRICE,
  TYPE_PLACEHOLDER,
  PIN_DEFAULT_LAT,
  PIN_DEFAULT_LNG,
  ALERT_SHOW_TIME,
  LOW_PRICE,
  MIDDLE_PRICE,
  RERENDER_DELAY,
  CAPACITY_DEFAULT_VALUE,
  TIMEOUT_DEFAULT_VALUE,
  FILE_TYPES
};
