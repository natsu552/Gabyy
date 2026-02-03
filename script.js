const playBtn = document.getElementById("playBtn");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");
const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const phaseText = document.getElementById("phase");

let score = 0;
let phase = 1;
let targetScore = 15;
let gameOver = false;

// PLAYER
let playerX = 150;
let targetX = 150;
let touching = false;

// DIFICULDADE
let heartSpeed = 3;
let obstacleSpeed = 4;

playBtn.onclick = startGame;

function startGame() {
  startScreen.style.display = "none";
  gameContainer.classList.remove("hidden");
  spawnHeart();
  spawnObstacle();
  requestAnimationFrame(movePlayer);
}

/* CONTROLE TOUCH */
game.addEventListener("touchstart", () => touching = true);
game.addEventListener("touchend", () => touching = false);

game.addEventListener("touchmove", e => {
  if (!touching || gameOver) return;
  const rect = game.getBoundingClientRect();
  targetX = e.touches[0].clientX - rect.left - 16;
});

/* MOVIMENTO SUAVE */
function movePlayer() {
  if (!gameOver) {
    playerX += (targetX - playerX) * 0.15;
    playerX = Math.max(0, Math.min(game.offsetWidth - 32, playerX));
    player.style.left = playerX + "px";
    requestAnimationFrame(movePlayer);
  }
}

/* ❤️ CORAÇÕES */
function spawnHeart() {
  if (gameOver) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * (game.offsetWidth - 38) + "px";
  heart.style.top = "0px";
  game.appendChild(heart);

  const fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      heart.remove();
      return;
    }

    heart.style.top = heart.offsetTop + heartSpeed + "px";

    if (collide(heart)) {
      score++;
      scoreText.innerText = `❤️ ${score} / ${targetScore}`;
      clearInterval(fall);
      heart.remove();

      // 🎯 COMPLETOU A FASE 1 → COFRE
      if (score >= targetScore && phase === 1) {
        gameOver = true;
        setTimeout(() => {
          alert("🔐 Você juntou amor suficiente! Vamos abrir o cofre 💖");
          window.location.href = "cofre.html";
        }, 300);
      }
    }

    if (heart.offsetTop > game.offsetHeight) {
      clearInterval(fall);
      heart.remove();
    }
  }, 30);

  setTimeout(spawnHeart, 1200);
}

/* 😤 OBSTÁCULOS */
function spawnObstacle() {
  if (gameOver) return;

  const obs = document.createElement("div");
  obs.className = "obstacle";
  obs.innerText = ["😡","💔","😤","⚡"][Math.floor(Math.random() * 4)];
  obs.style.left = Math.random() * (game.offsetWidth - 44) + "px";
  obs.style.top = "0px";
  game.appendChild(obs);

  const fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      obs.remove();
      return;
    }

    obs.style.top = obs.offsetTop + obstacleSpeed + "px";

    if (collide(obs)) {
      gameOver = true;
      clearInterval(fall);
      obs.remove();

      alert("😢 Mesmo com problemas, nosso amor continua ❤️");
      location.reload();
    }

    if (obs.offsetTop > game.offsetHeight) {
      clearInterval(fall);
      obs.remove();
    }
  }, 30);

  setTimeout(spawnObstacle, 1800);
}

/* COLISÃO */
function collide(el) {
  const a = el.getBoundingClientRect();
  const b = player.getBoundingClientRect();
  return (
    a.bottom > b.top &&
    a.top < b.bottom &&
    a.left < b.right &&
    a.right > b.left
  );
}