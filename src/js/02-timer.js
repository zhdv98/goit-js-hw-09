'use strict';

import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const userData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const timerEl = document.querySelector('.js-timer-items');
const timerDialog = document.querySelector('.timer__dialog');

btnStart.disabled = true;

let userSelectedDates = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if(selectedDates[0] <= options.defaultDate) {
            window.alert("Please choose a date in the future");
        } else btnStart.disabled = false;
        userSelectedDates = selectedDates[0];
        
    },
    };

flatpickr(userData, options);

const timer = {
    
    start() {
        let timerId = null;
        timerId = setInterval(() => {
        const now = Date.now();
        const diff = userSelectedDates - now;
        
        timerDialog.textContent = timer.getMessage(diff);

        if (diff <= 0) {
            clearInterval(timerId);
            return;
        };
        
        const { days, hours, minutes, seconds } = timer.getTimeComponents(diff);
        
        timerEl.querySelector('.js-timer__days').textContent = timer.pad(days);
        timerEl.querySelector('.js-timer__hours').textContent = timer.pad(hours);
        timerEl.querySelector('.js-timer__minutes').textContent = timer.pad(minutes);
        timerEl.querySelector('.js-timer__seconds').textContent = timer.pad(seconds);
        
        timerEl.querySelector('.js-timer__days').dataset.title = timer.declensionNum(days, [
        'day',
        'days',
        ]);
        timerEl.querySelector('.js-timer__hours').dataset.title = timer.declensionNum(hours, [
        'hour',
        'hours',
        ]);
        timerEl.querySelector('.js-timer__minutes').dataset.title = timer.declensionNum(minutes, [
        'minute',
        'minutes',
        ]);
        timerEl.querySelector('.js-timer__seconds').dataset.title = timer.declensionNum(seconds, [
        'second',
        'seconds',
        ]);
    }, 1000);
    },

    getMessage(diff) {

        if (diff > 0 ) {
            return "";
        }
        if (diff <= 0 ) {
            return "Time is over!";
        } 
    },

    getTimeComponents(diff) {
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        return {
        days,
        hours,
        minutes,
        seconds,
        };
    },

    pad(value) {
        return String(value).padStart(2, 0);
    },

    declensionNum(num, words) {

        if (num === 1) {
            return words[0];
        } else 
            return words[1];
    },
    };

    btnStart.addEventListener('click', timer.start);