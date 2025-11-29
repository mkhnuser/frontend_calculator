/* Yes, global state is bad, so let's use it. */

let mainBuffer = '';
let auxiliaryBuffer = '';
let currentOperation = '';
const operations = ['/', '×', '-', '+'];
const displayOutput = document.querySelector(".display-output");


function updateDisplayOutput(output) {
  displayOutput.innerText = output;
}


function obtainResult() {
  if (!currentOperation) {
    throw new Error("No current operation.");
  }
  switch (currentOperation) {
    case '/':
      if (+mainBuffer === 0) {
        throw new Error("Division by zero.");
      }
      return +auxiliaryBuffer / +mainBuffer;
    case '×':
      return +auxiliaryBuffer * +mainBuffer;
    case '-':
      return +auxiliaryBuffer - +mainBuffer;
    case '+':
      return +auxiliaryBuffer + +mainBuffer;
    default:
      throw new Error("Unsupported operation has been provided.");
  }
}

function startOperation(text) {
    auxiliaryBuffer = mainBuffer;
    mainBuffer = '';
    updateDisplayOutput('0');
    currentOperation = text;
}


function dispatch(text) {
  if (!isNaN(Number.parseInt(text))) {
    mainBuffer += text;
    console.log(mainBuffer);
    updateDisplayOutput(mainBuffer);

  } else if (text === 'C') {
    mainBuffer = '';
    updateDisplayOutput('0');

  } else if (text === '⌫') {
    mainBuffer = mainBuffer.slice(0, mainBuffer.length - 1);
    console.log(mainBuffer);
    updateDisplayOutput(mainBuffer !== '' ? mainBuffer : '0');

  } else if (operations.includes(text)) {
    startOperation(text);

  } else if (text === '=') {
    let result;

    try {
      result = obtainResult();
    } catch (error) {
      result = 0;
    }

    updateDisplayOutput(result);
    mainBuffer = result !== 0 ? String(result) : '';
    auxiliaryBuffer = '';
    currentOperation = '';

  } else {
    throw new Error("Invalid character has been received!");
  }
}


function main() {
  const calculator = document.querySelector(".calculator");
  calculator.addEventListener("click", function (e) {
    dispatch(e.target.innerText);
  });
}


(function () {
  main();
})();
