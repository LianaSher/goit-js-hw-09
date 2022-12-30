import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', true);
let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    isDateValid(selectedDates[0]);
    console.log(selectedTime);
  },
};

function isDateValid(date) {
  if (date - new Date() < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  btnStart.removeAttribute('disabled');
  selectedTime = date;
  return selectedTime;
}

const fp = flatpickr(inputEl, options);

let timerId = null;

btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  timerId = setInterval(() => {
    let moment = new Date();
    let difference = selectedTime - moment;
    const timeValues = convertMs(difference);
    updateMarkup(timeValues);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateMarkup(timeValues) {
  const { days, hours, minutes, seconds } = timeValues;
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    clearInterval(timerId);
  }
}
