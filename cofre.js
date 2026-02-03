const correctCode = "1527";
let inputCode = localStorage.getItem("cofre_code") || "";
const unlocked = localStorage.getItem("cofre_unlocked");

const display = document.getElementById("display");
const message = document.getElementById("message");

// SE JÁ DESBLOQUEOU
if (unlocked === "true") {
  display.innerText = "🔓";
  message.innerText = "Você já abriu o cofre, meu amor ❤️";
}

// ATUALIZA DISPLAY
function updateDisplay() {
  display.innerText = inputCode.padEnd(4, "-");
  localStorage.setItem("cofre_code", inputCode);
}

// PRESSIONAR NÚMERO
function pressKey(num) {
  if (inputCode.length >= 4 || unlocked === "true") return;
  inputCode += num;
  updateDisplay();
}

// LIMPAR
function clearCode() {
  if (unlocked === "true") return;
  inputCode = "";
  updateDisplay();
  message.innerText = "";
}

// VERIFICAR
function checkCode() {
  if (unlocked === "true") return;

  if (inputCode === correctCode) {
    localStorage.setItem("cofre_unlocked", "true");
    display.innerText = "🔓";
    message.innerText = "💖 Cofre aberto! Você é incrível 💖";
  } else {
    message.innerText = "❌ Senha errada, tenta de novo 😘";
    inputCode = "";
    updateDisplay();
  }
}

updateDisplay();