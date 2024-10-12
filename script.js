const calculator = document.querySelector('.calculator');
const display = document.getElementById('display-screen');
const buttons = document.querySelectorAll('button');

let firstValue = null;
let operator = null;
let previousKeyType = null;
let calcValue = null;
let modValue = null;

calculator.dataset.previousKeyType = 'clear';

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;
    const action = e.target.dataset.action;
    const displayedNum = display.value;
    previousKeyType = calculator.dataset.previousKeyType;

    if (!action) { 
      if (displayedNum === '0' || 
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate') {
        display.value = value;
      } else {
        display.value = displayedNum + value;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide') {
      if (firstValue && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, displayedNum);
        display.value = calcValue;
        firstValue = calcValue;
      } else {
        firstValue = displayedNum;
      }

      operator = action;
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = 'operator';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.value = displayedNum + '.';
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.value = '0.';
      }

      calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
      if (displayedNum !== '0') {
        display.value = '0';
      } 
      calculator.dataset.previousKeyType = 'clear';
      firstValue = null;
      operator = null;
      modValue = null;
    }

    if (action === 'calculate') {
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = modValue;
          secondValue = displayedNum;
        }

        display.value = calculate(firstValue, operator, secondValue);
        modValue = secondValue;
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }

    if (action === 'backspace') {
      if (displayedNum.length > 1) {
        display.value = displayedNum.slice(0, -1);
      } else {
        display.value = '0';
      }
      calculator.dataset.previousKeyType = 'backspace';
    }
  });
});

const calculate = (n1, operator, n2) => {
  let result = '';
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}