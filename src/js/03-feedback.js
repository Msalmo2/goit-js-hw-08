// Import the throttle function from lodash
import throttle from 'lodash.throttle';

// Throttle the function to be called at most once every 500 milliseconds
const saveToLocalStorageThrottled = throttle(saveToLocalStorage, 500);


document
  .querySelector('.feedback-form')
  .addEventListener('input', saveToLocalStorageThrottled);


window.addEventListener('load', loadFromLocalStorage);


document
  .querySelector('.feedback-form')
  .addEventListener('submit', function (event) {

    event.preventDefault();


    const formData = loadFromLocalStorage();


    localStorage.removeItem('feedback-form-state');


    document.querySelector('.feedback-form').reset();


    console.log('Form Data:', formData);
  });


function saveToLocalStorage() {
  const email = document.querySelector('[name="email"]').value;
  const message = document.querySelector('[name="message"]').value;

  const formData = { email, message };


  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}


function loadFromLocalStorage() {
  const storedData = localStorage.getItem('feedback-form-state');

  if (storedData) {
    const formData = JSON.parse(storedData);


    document.querySelector('[name="email"]').value = formData.email;
    document.querySelector('[name="message"]').value = formData.message;

    return formData;
  }


  return {};
}
