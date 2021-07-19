import { showAlert } from './utils.js';
import { setToDefault, isEscEvent } from './utils.js';

const Url = {
  SERVER: 'https://23.javascript.pages.academy/keksobooking',
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
};
const successElement = document.querySelector('#success').content;
const errorElement = document.querySelector('#error').content;
const successMessageElement = successElement
  .querySelector('.success')
  .cloneNode(true);
const errorMessageElement = errorElement
  .querySelector('.error')
  .cloneNode(true);
const errorMessageButton = errorMessageElement.querySelector('button');

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(showAlert);
};

const onSuccessMessageClick = () => {
  successMessageElement.remove();
  setToDefault();
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successMessageElement.remove();
    setToDefault();
  }
};

const onErrorMessageButton = () => {
  errorMessageElement.remove();
};

const onErrorMessageClick = () => {
  errorMessageElement.remove();
};

const onErrorMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    errorMessageElement.remove();
  }
};

const sendData = (body) => {
  fetch(Url.SERVER, {
    method: 'POST',
    type: 'multipart/form-data',
    body,
  })
    .then((response) => {
      if (response.ok) {
        document.body.append(successMessageElement);
        document.addEventListener('keydown', onSuccessMessageEscKeydown);
        document.addEventListener('click', onSuccessMessageClick);
      } else {
        document.body.append(errorMessageElement);
        errorMessageButton.addEventListener('click', onErrorMessageButton);
        document.addEventListener('click', onErrorMessageClick);
        document.addEventListener('keydown', onErrorMessageKeydown);
      }
    })
    .catch(() => {
      document.body.append(errorMessageElement);
      errorMessageButton.addEventListener('click', onErrorMessageButton);
      document.addEventListener('click', onErrorMessageClick);
      document.addEventListener('keydown', onErrorMessageKeydown);
    });
};

export {
  getData,
  sendData,
  onSuccessMessageClick,
  onSuccessMessageEscKeydown
};
