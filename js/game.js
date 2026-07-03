let gameRunning = false;
let score = 0;
let lastTime = 0;
let gameLoop = null;
let finalScoreElement = document.getElementById('final-score');
let characterElement = new Character(50, 0);

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function initializeGame() {
    score = 0;
    document.getElementById('score').textContent = `0`;
    characterElement.position.y = characterElement.groundLevel;
    characterElement.velocity = 0;
    characterElement.isJumping = false;
    if(typeof resetObstacles === 'function') { resetObstacles(); }
}

function startGame() {
    showScreen('game-screen');
    initializeGame();
    gameRunning = true;
    lastTime = performance.now();
    if (typeof spawnObstacle === 'function') { spawnObstacle(); }
    if(gameLoop) { cancelAnimationFrame(gameLoop); }
    gameLoop = requestAnimationFrame(gameUpdate);
}

function gameOver() {
    gameRunning = false;
    if(gameLoop) {
        cancelAnimationFrame(gameLoop);
        gameLoop = null;
    }
    showScreen('gameover-screen');
    if(finalScoreElement) {
        finalScoreElement.textContent = `${score}`;
    }
}

function restartGame() {
    startGame();
}

function gameUpdate(currentTime) {
    if(!gameRunning) { return; }

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    characterElement.update(deltaTime);

    if(typeof updateObstacles === 'function') { updateObstacles(deltaTime); }
    if(typeof checkCollisions === 'function') { checkCollisions(); }

    gameLoop = requestAnimationFrame(gameUpdate);
}


function handleKeyboard(event) {
    const key = event.key;
    if (key === ' ' || key === 'ArrowUp') {
        event.preventDefault();
        characterElement.jump();
    }
}

document.addEventListener('keydown', handleKeyboard);

<<<<<<< HEAD
gameRunning = true;
spawnObstacle();
requestAnimationFrame(gameUpdate);
=======
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    if(startButton) { startButton.addEventListener('click', startGame); }
    if(restartButton) { restartButton.addEventListener('click', restartGame); }
});
>>>>>>> 93aa8bda8025772ea3d76ae690de86a5d4be81a8
