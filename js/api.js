import { showAlert } from './utils.js';
import { setToDefault, isEscEvent } from './utils.js';

const Url = {
  SERVER: 'https://23.javascript.pages.academy/keksobooking',
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
};
const successElement = document.querySelector('#success').content;
const errorElement = document.querySelector('#error').content;

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(showAlert);
};

const sendData = (body) => {
  fetch(Url.SERVER,
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        const successMessageElement = successElement.querySelector('.success').cloneNode(true);
        document.body.append(successMessageElement);
        document.addEventListener('keydown',(evt)=> {
          if (isEscEvent(evt)) {
            evt.preventDefault();
            successMessageElement.remove();
            setToDefault();
          }
        });
        document.addEventListener('click',()=> {
          successMessageElement.remove();
          setToDefault();
        });
      } else {
        const errorMessageElement = errorElement.querySelector('.error').cloneNode(true);
        document.body.append(errorMessageElement);
        errorMessageElement.querySelector('button').addEventListener('click',() => {
          errorMessageElement.remove();
        });
        document.addEventListener('click',()=> {
          errorMessageElement.remove();
        });
        document.addEventListener('keydown',(evt)=> {
          if (isEscEvent(evt)) {
            evt.preventDefault();
            errorMessageElement.remove();
          }
        });
      }
    })
    .catch(() =>{
      const errorMessageElement = errorElement.querySelector('.error').cloneNode(true);
      document.body.append(errorMessageElement);
    });
};

export {getData, sendData };
