let calculation = JSON.parse(localStorage.getItem('calculation')) || '';
displayCalculation();

function addToCalculation (value) {
  calculation = calculation + value;
  if (calculation.length >= 30) return;
  localStorage.setItem('calculation', JSON.stringify(calculation));
  displayCalculation();
}

// Preprocess calculation to handle implicit multiplication
function preprocessCalculation(calc) {
  // number followed by ( → multiply
  calc = calc.replace(/(\d)\(/g, '$1*(');
  // ) followed by number → multiply
  calc = calc.replace(/\)(\d)/g, ')*$1');
  // ) followed by ( → multiply
  calc = calc.replace(/\)\(/g, ')*(');
  return calc;
}

function displayCalculation() {
  const display = document.querySelector('.js-calculator-display');
  display.innerHTML = calculation || '0';  
}

function resetCalculation() {
  calculation = '';
  localStorage.setItem('calculation', JSON.stringify(calculation));
 displayCalculation();
}

function backspace() {
  calculation = calculation.slice(0, -1);
  localStorage.setItem('calculation', JSON.stringify(calculation));
  displayCalculation();
}

function evaluateCalculation() {
  try {
    const processed = preprocessCalculation(calculation);
    calculation = eval(processed);
    displayCalculation();
  } catch (e) {
    alert("Invalid calculation!");
  }
}


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/\d/.test(key)) addToCalculation(key);
  else if ("+-*/".includes(key)) addToCalculation(` ${key} `);
  else if (key === ".") addToCalculation(".");
  else if (key === "Enter" || event.code === "NumpadEnter") evaluateCalculation();
  else if (key === "(" || key === ")") addToCalculation(key);
  else if (key === "Backspace") backspace();
  else if (key === "Delete") resetCalculation();
});