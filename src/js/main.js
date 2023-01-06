let baterrylevel = document.querySelector('.headerCalk__battery');
navigator.getBattery().then((battery) => {
  updateLevelInfo();
  battery.addEventListener('levelchange', () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    baterrylevel.innerHTML = `${battery.level * 100}%`;
  }
});

// let hour = document.querySelector('.hour');
// let minute = document.querySelector('.minute');
// let date = document.querySelector('.date');
function clock() {
  const datetime = new Date();
  document.querySelector('.minute').innerHTML = datetime.getMinutes().toString().padStart(2, '0');
  document.querySelector('.hour').innerHTML = datetime.getHours().toString().padStart(2, '0');
  document.querySelector('.date').innerHTML = `${datetime.getDate().toString().padStart(2, '0')}.${(
    datetime.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${datetime.getFullYear()}`;
}

setInterval(() => {
  document.querySelector('.twoDotet').classList.toggle('is-notTwoDotet');
  clock();
}, 1000);

let typeConnection = navigator.connection.effectiveType;
updateConnectionStatus();
navigator.connection.addEventListener('change', updateConnectionStatus);
function updateConnectionStatus() {
  if (navigator.onLine) {
    if (typeConnection === '4g') {
      document
        .querySelector('.headerCalk__connection')
        .classList.remove('connection4G', 'connection3G', 'connectionE', 'connectionNosignal');
      document.querySelector('.headerCalk__connection').classList.add('connection5G');
    } else if (typeConnection === '3g') {
      document
        .querySelector('.headerCalk__connection')
        .classList.remove('connection5G', 'connection3G', 'connectionE', 'connectionNosignal');
      document.querySelector('.headerCalk__connection').classList.add('connection4G');
    } else if (typeConnection === '2g') {
      document
        .querySelector('.headerCalk__connection')
        .classList.remove('connection5G', 'connection4G', 'connectionE', 'connectionNosignal');
      document.querySelector('.headerCalk__connection').classList.add('connection3G');
    } else {
      document
        .querySelector('.headerCalk__connection')
        .classList.remove('connection5G', 'connection4G', 'connection3G', 'connectionNosignal');
      document.querySelector('.headerCalk__connection').classList.add('connectionE');
    }
  } else {
    document
      .querySelector('.headerCalk__connection')
      .classList.remove('connection5G', 'connection4G', 'connection3G', 'connectionE');
    document.querySelector('.headerCalk__connection').classList.add('connectionNosignal');
  }
}

const input = document.querySelector('.board__text');
const resultCalk = document.querySelector('.results');
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];
let firstNumber = '';
let secondNumber = '';
let sign = '';
let finish = false;

setTimeout(() => {
  input.value = '';
}, 1500);

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  sign = '';
  finish = false;
  input.value = 0;
  resultCalk.textContent = 0;
  document.querySelector('.results').classList.remove('psevdoResult');
}

function maxDigits(res) {
  let str = res.toString();
  if (str.length > 10) {
    return str.slice(0, 9) + 'e' + (str.length - 10);
  } else return res;
}

document.querySelector('.button__null').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  let target = event.target;
  let key = event.target.textContent;
  if (!target.classList.contains('button')) return;
  if (target.classList.contains('button__null')) return;
  if (digit.includes(key)) {
    if (secondNumber === '' && sign === '') {
      firstNumber += key;
      input.value = maxDigits(firstNumber);
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      input.value = maxDigits(secondNumber);
    } else {
      secondNumber += key;
      input.value = maxDigits(secondNumber);
      resultCalk.textContent = maxDigits(firstNumber);
    }
  }
  if (action.includes(key)) {
    sign = key;
    input.value = sign;
    return;
  }
  if (target.classList.contains('button__proc')) {
    firstNumber = firstNumber / 100;
    input.value = maxDigits(firstNumber);
    resultCalk.textContent = maxDigits(firstNumber);
  }
  if (target.classList.contains('button__plusMinus')) {
    if (sign === '' && firstNumber > 0) {
      firstNumber = firstNumber - 2 * firstNumber;
      input.value = maxDigits(firstNumber);
    } else if (sign === '' && firstNumber < 0) {
      firstNumber = firstNumber + 2 * Math.abs(firstNumber);
      input.value = maxDigits(firstNumber);
    } else if (secondNumber > 0) {
      secondNumber = secondNumber - 2 * secondNumber;
      input.value = maxDigits(secondNumber);
    } else if (secondNumber < 0) {
      secondNumber = secondNumber + 2 * Math.abs(secondNumber);
      input.value = maxDigits(secondNumber);
    } else return;
  }
  if (key === '=') {
    if (secondNumber === '') secondNumber = firstNumber;
    switch (sign) {
      case '+':
        firstNumber = +firstNumber + +secondNumber;
        break;
      case '-':
        firstNumber = firstNumber - secondNumber;
        break;
      case '*':
        firstNumber = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === '0') {
          firstNumber = 'Error!';
        } else {
          firstNumber = firstNumber / secondNumber;
        }
        break;
    }
    finish = true;
    input.value = maxDigits(firstNumber);
    resultCalk.textContent = maxDigits(firstNumber);
  }
  if (resultCalk.textContent !== '') {
    document.querySelector('.results').classList.add('psevdoResult');
  }
};
