// ===== DEPLOY SIMULATION =====
function startDeploy() {
  const log = document.getElementById('deploy-log');
  log.innerHTML = '';
  const steps = [
    '⏳ Cloning repository...',
    '📦 Installing dependencies...',
    '🔧 Configuring environment...',
    '🚀 Starting deployment...',
    '✅ Bot deployed successfully!',
    '🌐 Live at: https://silent-dj-bot.up.railway.app'
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      log.innerHTML += `<div>${steps[i]}</div>`;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

// ===== COIN PURCHASE =====
function buyCoins(amount) {
  alert(`✅ You purchased ${amount} coins! Payment received.`);
}

// ===== AVIATOR GAME =====
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false;
let multiplier = 1;
let bet = 10;
let result = '';

function startGame() {
  if (gameRunning) return;
  bet = parseInt(document.getElementById('betAmount').value) || 10;
  if (bet < 1) {
    alert('Bet must be at least 1 coin.');
    return;
  }
  gameRunning = true;
  multiplier = 1;
  result = '';
  document.getElementById('gameResult').textContent = '🚀 Flying...';
  const crashPoint = 1 + Math.random() * 4;
  let frame = 0;
  const gameLoop = setInterval(() => {
    frame++;
    multiplier = 1 + frame * 0.03;
    if (multiplier > crashPoint) {
      clearInterval(gameLoop);
      gameRunning = false;
      document.getElementById('gameResult').textContent = `💥 Crashed at ${multiplier.toFixed(2)}x! You lost ${bet} coins.`;
      drawGame(multiplier, true);
      return;
    }
    drawGame(multiplier, false);
  }, 50);
  window._gameLoop = gameLoop;
  window._crashPoint = crashPoint;
}

function cashOut() {
  if (!gameRunning) {
    alert('No game running!');
    return;
  }
  const win = Math.floor(bet * multiplier);
  document.getElementById('gameResult').textContent = `🎉 Cashed out at ${multiplier.toFixed(2)}x! You won ${win} coins!`;
  gameRunning = false;
  clearInterval(window._gameLoop);
  drawGame(multiplier, false);
}

function drawGame(mult, crashed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Background
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Grid
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 40, 0);
    ctx.lineTo(i * 40, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * 30);
    ctx.lineTo(canvas.width, i * 30);
    ctx.stroke();
  }
  // Graph line
  ctx.strokeStyle = crashed ? '#FF2D2D' : '#00FF41';
  ctx.lineWidth = 3;
  ctx.beginPath();
  const endX = Math.min(mult * 50, canvas.width);
  for (let x = 0; x < endX; x++) {
    const y = canvas.height - 30 - (x / 50) * 30;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Multiplier text
  ctx.fillStyle = '#fff';
  ctx.font = '20px Orbitron, sans-serif';
  ctx.fillText(`${mult.toFixed(2)}x`, 20, 40);
}
