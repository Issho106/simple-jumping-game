const deltaTime = 1/30;
const character = {
    width: 25,
    height: 40,
    position: { x: 0, y: 0 },
    velocity: 0,
    isJumping: false,
    gravity: 10,
    jumpStrength: -300,
    groundLevel: 0,

    draw() {
        context.fillStyle = '#1f1f1f';
        context.fillRect = (this.position.x, this.position.y, this.width, this.height);
    },

    updateCharacterPosition() {
        if(this.isJumping) {
            this.position.y += this.velocity;
            this.velocity += this.gravity;

            if(this.position.y >= 0) {
                this.position.y = 0;
                this.isJumping = false;
                this.velocity = 0;
            }
        }

    },

    jump() {
        if(!this.isJumping) {
            this.velocity = this.jumpStrength;
            this.isJumping = true;
        }
    }
};

let gameRunning = false;
let score = 0;
let frameCount = 0;
let gameLoop = null;
let gameUpdate = updateCharacterPosition(deltaTime);
let finalScoreElement = document.getElementById('final-score');

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
         screen.classList.remove('active');
        });
    document.getElementById(screenId).classList.add('active');
}

function initializeGame() {
    score = 0;
    frameCount = 0;
    character.position.y = character.groundLevel;
    character.velocity = 0;
    character.isJumping = false;
    document.getElementById('score').textContent = 'Score: 0';
}

function startGame() {
    showScreen('gameplay-screen');
    initializeGame();
    gameRunning = true;
    if(gameLoop) { cancelAnimationFrame(gameLoop); }
    gameLoop = requestAnimationFrame(gameUpdate);
}

function gameOver() {
    gameRunning = false;
    if(gameLoop) { cancelAnimationFrame(gameLoop); }
    if(score > 0) {
        showScreen('game-over-screen');
        finalScoreElement.textContent = `Final Score: ${score}`;
    }
}

createObstacle();
setInterval(()=> {
    updateObstacles(1/60);
}, 1000/60);