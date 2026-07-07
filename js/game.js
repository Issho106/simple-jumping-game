let gameRunning = false;
let score = 0;
let lastTime = 0;
let gameLoop = null;
let gameSpeed = 200;
let speedLevel = 0;
const scoreRate = 10;
const figures = document.querySelectorAll('#selections figure');
let finalScoreElement = document.getElementById('final-score');
let characterElement;
let characterSelected = 'silver';

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function selectCharacter(event) {
    figures.forEach(figure => figure.classList.remove('selected'));
    const clickedFigure = event.currentTarget;
    clickedFigure.classList.add('selected');
    characterSelected = clickedFigure.dataset.character; 
    if(characterSelected === 'golden') { characterElement = new GoldenKnight(); }
    else { characterElement = new SilverKnight(); }
}

function playGame() {
    showScreen('select-screen');
}

function initializeGame() {
    gameSpeed = 200;
    score = 0;
    document.getElementById('score').textContent = `0`;
    characterElement.position.y = characterElement.groundLevel;
    characterElement.velocity = 0;
    characterElement.isJumping = false;
    if(typeof resetObstacles === 'function') { resetObstacles(); }
}

function startGame() {
    if(!characterElement) {
        if(characterSelected === 'golden') { characterElement = new GoldenKnight(); }
        else { characterElement = new SilverKnight(); }
    }

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
        finalScoreElement.textContent = Math.floor(score);
    }
}

function restartGame() {
    startGame();
}

function changeCharacter() {
    playGame();
}

function gameUpdate(currentTime) {
    if(!gameRunning) { return; }

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    score += scoreRate * deltaTime;
    document.getElementById('score').textContent = Math.floor(score);
    const newSpeedLevel = Math.floor(score / 100);

    if (newSpeedLevel > speedLevel) {
        speedLevel = newSpeedLevel;
        gameSpeed += 25;
    }
    characterElement.update(deltaTime);

    if(typeof updateObstacles === 'function') { updateObstacles(deltaTime); }
    if(typeof checkCollisions === 'function') { checkCollisions(characterElement); }

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

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-btn');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const changeButton = document.getElementById('change-btn');
    
    if(playButton) { playButton.addEventListener('click', playGame); }
    if(startButton) { startButton.addEventListener('click', startGame); }
    if(restartButton) { restartButton.addEventListener('click', restartGame); }
    if(changeButton) { changeButton.addEventListener('click', changeCharacter); }

    if (figures.length > 0) { 
        figures.forEach(figure => {
        figure.addEventListener('click', selectCharacter);
        });
    }
});