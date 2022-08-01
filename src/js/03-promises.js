'use strict';
import Notiflix from 'notiflix';

const firstInput = document.querySelector('input[name="delay"]');
const secondInput = document.querySelector('input[name="step"]');
const thirdInput = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
event.preventDefault();

let delay = Number(firstInput.value);
for (let i = 1; i <= thirdInput.value; i++) {
  if (i > 1) {
  delay += Number(secondInput.value);
  };
  createPromise(i, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    if(shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position,delay});
    }
    }, delay);
  });

  return promise;
}
