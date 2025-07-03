// [Previous JavaScript code remains exactly the same]
let currentInput = "0";
let previousInput = "";
let operation = null;
let resetInput = false;
let calculationHistory = "";

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const themeToggle = document.getElementById("themeToggle");

function updateDisplay() {
  display.textContent = currentInput;
  historyDisplay.textContent = calculationHistory;
}

function appendNumber(number) {
  if (currentInput === "0" || resetInput) {
    currentInput = number;
    resetInput = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (resetInput) {
    currentInput = "0.";
    resetInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operation !== null) calculate();
  previousInput = currentInput;
  operation = op;
  calculationHistory = `${previousInput} ${operation}`;
  resetInput = true;
  updateDisplay();
}

function calculate() {
  if (operation === null) return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }

  calculationHistory = `${previousInput} ${operation} ${currentInput} =`;
  currentInput = result.toString();
  operation = null;
  resetInput = true;
  updateDisplay();
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operation = null;
  calculationHistory = "";
  updateDisplay();
}

function backspace() {
  if (
    currentInput.length === 1 ||
    (currentInput.length === 2 && currentInput.startsWith("-"))
  ) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function percentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "🌙";
    document.documentElement.style.setProperty("--neon-cyan", "#006666");
    document.documentElement.style.setProperty("--dark-cyan", "#004444");
    document.documentElement.style.setProperty("--black", "#f0f0f0");
    document.documentElement.style.setProperty("--darker-bg", "#d0e0e0");
    document.documentElement.style.setProperty(
      "--display-bg",
      "rgba(200, 230, 230, 0.7)"
    );
  } else {
    themeToggle.textContent = "☀️";
    document.documentElement.style.setProperty("--neon-cyan", "#0ff");
    document.documentElement.style.setProperty("--dark-cyan", "#0aa");
    document.documentElement.style.setProperty("--black", "#000");
    document.documentElement.style.setProperty("--darker-bg", "#022");
    document.documentElement.style.setProperty(
      "--display-bg",
      "rgba(0, 20, 20, 0.7)"
    );
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  else if (e.key === ".") appendDecimal();
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    appendOperator(e.key);
  else if (e.key === "%") percentage();
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Escape") clearAll();
  else if (e.key === "Backspace") backspace();
});

updateDisplay();
