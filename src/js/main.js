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
  document.querySelector('.date').innerHTML = `${(datetime.getDate() + 1).toString().padStart(2, '0')}.${(
    datetime.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${datetime.getFullYear()}`;
}

setInterval(() => {
  document.querySelector('.twoDotet').classList.toggle('is-notTwoDotet');
  clock();
}, 1000);

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
  resultCalk.value = 0;
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
      input.value = firstNumber;
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      input.value = secondNumber;
    } else {
      secondNumber += key;
      input.value = secondNumber;
      resultCalk.value = firstNumber;
    }
  }
  if (action.includes(key)) {
    sign = key;
    input.value = sign;
    return;
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
        firstNumber = firstNumber / secondNumber;
        break;
    }
    finish = true;
    input.value = firstNumber;
    resultCalk.value = firstNumber;
  }
};
