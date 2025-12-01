let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        if (displayValue === '0') {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function performCalculation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return second;
    }
}

function calculate() {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand !== null) {
        const result = performCalculation(firstOperand, inputValue, operator);
        displayValue = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLastChar() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

// Initialize display
updateDisplay();
