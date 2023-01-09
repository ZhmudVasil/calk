let baterrylevel = document.querySelector('.headerCalk__battery');
navigator.getBattery().then((battery) => {
  updateLevelInfo();
  battery.addEventListener('levelchange', () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    baterrylevel.innerHTML = `${Math.round(battery.level * 100)}%`;
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
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', '*', '/'];
// let firstNumber = '';
// let secondNumber = '';
let sign = [];
let value = '';
let numbers = [];
let plusMinusValue = false;
let finish = false;

setTimeout(() => {
  input.value = '';
}, 1500);

function clearAll() {
  // firstNumber = '';
  // secondNumber = '';
  sign = [];
  value = '';
  numbers = [];
  finish = false;
  input.value = '';
  resultCalk.textContent = 0;
  document.querySelector('.results').classList.remove('psevdoResult');
}

document.querySelector('.button__null').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  let target = event.target;
  let key = event.target.textContent;
  if (!target.classList.contains('button')) return;
  if (target.classList.contains('button__null')) return;
  if (target.classList.contains('button__point')) {
    let lastSimbol = input.value.slice(input.value.length - 1);

    if (lastSimbol === '*' || lastSimbol === '/' || lastSimbol === '+' || lastSimbol === '-' || lastSimbol === '') {
      input.value += '0.';
      value += '0.';
      numbers.push(+value);
    } else if (lastSimbol === '.') {
      return;
    }
    if (
      input.value.split('.').length > 1 &&
      input.value.split('.')[input.value.split('.').length - 1].match(/\/|\*|\+|-|=/) === null
    ) {
      return;
    }
    input.value += '.';
    value += '.';
    return;
  }
  if (digit.includes(key)) {
    let lastSimbol = input.value.slice(input.value.length - 1);
    let lastTwoSimbol = input.value.slice(input.value.length - 2);
    if (
      (lastSimbol !== '.' && value !== '') ||
      (lastSimbol === '0' && value === '0') ||
      (lastTwoSimbol === '0.' && value === '0.') ||
      (lastSimbol === '.' && value !== '')
    ) {
      numbers.pop();
    }

    input.value += key;
    value += key;
    numbers.push(+value);

    resultCalk.textContent = results();
  }

  if (action.includes(key)) {
    if (!numbers[0]) return;
    if (numbers.length <= sign.length) {
      sign.pop();
      sign.push(key);
      let text = input.value;
      input.value = text.substr(0, text.length - 1) + key;
    } else {
      numbers.pop();
      numbers.push(+value);
      value = '';
      sign.push(key);
      input.value += key;
    }

    return;
  }
  if (target.classList.contains('button__plusMinus')) {
    plusMinusValue = true;
    let lastDigits = numbers[numbers.length - 1];
    let lengthPositivStr = input.value.length - lastDigits.toString().length;
    let lengthNegativStr = input.value.length - lastDigits.toString().length - 2;
    let text;

    if (lastDigits > 0) {
      lastDigits = lastDigits - 2 * lastDigits;
      text = input.value.substring(0, lengthPositivStr);
      input.value = text + '(' + lastDigits + ')';
    } else if (lastDigits < 0) {
      lastDigits = lastDigits + 2 * Math.abs(lastDigits);
      text = input.value.substring(0, lengthNegativStr);
      input.value = text + lastDigits;
    }

    resultCalk.textContent = results();
  }

  // let arrDigits = arr.split(/\/|\*|\+|-|=/);
  // let arrSign = arr.split(/\d/).filter((item) => item !== '' && item !== '.');
  // if (key === '=') {
  //   if (secondNumber === '') secondNumber = firstNumber;
  //   switch (sign) {
  //     case '+':
  //       firstNumber = +firstNumber + +secondNumber;
  //       break;
  //     case '-':
  //       firstNumber = firstNumber - secondNumber;
  //       break;
  //     case '*':
  //       firstNumber = firstNumber * secondNumber;
  //       break;
  //     case '/':
  //       if (secondNumber === '0') {
  //         firstNumber = 'Error!';
  //       } else {
  //         firstNumber = firstNumber / secondNumber;
  //       }
  //       break;
  //   }
  //   finish = true;
  //   input.value = firstNumber;
  //   resultCalk.textContent = firstNumber;
  // }
  if (resultCalk.textContent !== '') {
    document.querySelector('.results').classList.add('psevdoResult');
  }
};

function plusMinus(arr) {
  let lastDigits = +arr.pop();
  if (lastDigits > 0) {
    lastDigits = lastDigits - 2 * lastDigits;
  } else if (lastDigits < 0) {
    lastDigits = lastDigits + 2 * Math.abs(lastDigits);
  }
  numbers.pop();
  console.log(numbers);
  numbers.push(lastDigits);
  console.log(numbers);
  return arr.push(lastDigits);
}

function results() {
  let arrDigits = numbers.slice(0);
  console.log(numbers);

  let arrSign = sign.slice(0);
  if (plusMinusValue === true) {
    plusMinus(arrDigits);
  }
  let operators = ['*', '/', '-', '+'];
  for (let i = 0; i < operators.length; i++) {
    let countOperator = arrSign.filter((item) => item === operators[i]);
    for (let j = 0; j < countOperator.length; j++) {
      let index = arrSign.indexOf(operators[i]);
      if (operators[i] === '*') {
        arrDigits.splice(index, 2, maxDigits(+arrDigits[index] * +arrDigits[index + 1]));
      } else if (operators[i] === '/') {
        arrDigits.splice(index, 2, maxDigits(+arrDigits[index] / +arrDigits[index + 1]));
      } else if (operators[i] === '+') {
        arrDigits.splice(index, 2, maxDigits(+arrDigits[index] + +arrDigits[index + 1]));
      } else {
        arrDigits.splice(index, 2, maxDigits(+arrDigits[index] - +arrDigits[index + 1]));
      }
      arrSign.splice(index, 1);
    }
  }
  plusMinusValue = false;
  return arrDigits;
}

function maxDigits(rez) {
  if (rez.toString().length > 15) {
    rez = parseFloat(rez.toPrecision(13));
    if (rez.toString().length > 15) {
      rez = rez.toExponential(12);
    }
    return rez;
  } else {
    return rez;
  }
}
