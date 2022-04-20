const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");

function calc(eve) {
  if (eve.target.nodeName === "BUTTON") {
    const key = eve.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;

    const calculate = (n1, operator, n2) => {
      const firstNum = parseFloat(n1);
      const secondNum = parseFloat(n2);
      if (operator === "add") return firstNum + secondNum;
      if (operator === "subtract") return firstNum - secondNum;
      if (operator === "multiply") return firstNum * secondNum;
      if (operator === "divide") return firstNum / secondNum;
    };

    const previousKeyType = calculator.dataset.previousKeyType;
    if (!action) {
      if (
        displayNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calc = calculate(firstValue, operator, secondValue);
        display.textContent = calc;
        calculator.dataset.firstValue = calc;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      if (!displayNum.includes(".")) {
        display.textContent = displayNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayNum;
      const operator = calculator.dataset.operator;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);

        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = "calculate";
      }
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // Array.from(key.parentNode.children).forEach((k) =>
    //   k.classList.remove("is-depressed")
    // );
  }
}

keys.addEventListener("click", calc);
