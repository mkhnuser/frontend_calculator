/* Yes, global state is bad, so let's use it. */

let mainBuffer = '';
let auxiliaryBuffer = '';
const displayOutput = document.querySelector(".display-output");


function updateDisplayOutput(output) {
  displayOutput.innerText = output;
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
