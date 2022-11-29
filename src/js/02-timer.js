import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnStart.addEventListener('click', onBtnStartClick);

let dateOfEvent = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeBeforeEvent(selectedDates[0].getTime());
  },
};

btnStart.setAttribute('disabled', true);
const fp = flatpickr(inputDate, options);

function timeBeforeEvent(setDate) {
  const difference = setDate - Date.now();
  if (difference < 0) {
    alert('Please choose a date in the future');
  } else {
    btnStart.removeAttribute('disabled');
    dateOfEvent = setDate;

    return dateOfEvent;
  }

  //   console.log(convertMs(difference));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function onBtnStartClick() {
  const nowDate = Date.now();
  const difference = dateOfEvent - nowDate;

  timer(difference);
}

function timer(time) {
  const startTime = Date.now();
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const difference = currentTime - startTime;
    let result = time - difference;
    apdateInterface(convertMs(result));
  }, 1000);
}

function apdateInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}
