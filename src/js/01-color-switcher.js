const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStartEl.addEventListener('click', onBtnStartClick);
btnStopEl.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

function onBtnStartClick() {
  btnStartEl.setAttribute('disabled', true);
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick() {
  btnStartEl.removeAttribute('disabled');
  clearInterval(timerId);
}
