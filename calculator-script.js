let calculation = JSON.parse(localStorage.getItem('calculation')) || '';
displayCalculation();

function addToCalculation (value) {
  calculation = calculation + value;
  localStorage.setItem('calculation', JSON.stringify(calculation));
  displayCalculation();
}

function displayCalculation() {
  document.querySelector('.js-calculator-display')
    .innerHTML = calculation;
}

function resetCalculation() {
  calculation = '';
 displayCalculation();
}

function evaluateCalculation() {
  eval(calculation);
  calculation = eval(calculation);
  displayCalculation();
}


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/\d/.test(key)) addToCalculation(key);
  else if ("+-*/".includes(key)) addToCalculation(` ${key} `);
  else if (key === ".") addToCalculation(".");
  else if (key === "Enter" || event.code === "NumpadEnter") evaluateCalculation();
  else if (key === "(" || key === ")") addToCalculation(key);
  else if (key === "Backspace") resetCalculation();
});