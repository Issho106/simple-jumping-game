let isJumping = false;
let position = { x: 0, y: 0 };
let velocity = 0;
const gravity = 980;
const jumpStrength = -300;
const groundLevel = 0;
const charElement = document.getElementById('character');
function jump() {
    if (isJumping) return;
    isJumping = true;
    velocity = jumpStrength;
}

function updateCharacterPosition(deltaTime) {
    position.y += velocity * deltaTime;
}

function applyGravity(deltaTime) {
    velocity += gravity * deltaTime;
}

function land() {
    isJumping = false;
    velocity = 0;
    position.y = groundLevel;
}

function update(deltaTime) {
    applyGravity(deltaTime);
    updateCharacterPosition(deltaTime);
    if (position.y >= groundLevel) {
        land();
    }

    charElement.style.bottom = `${20-position.y}px`;
}

function handleKeyboard(event) {
    const key = event.key;
    if (key === ' ' || key === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
}

function handleClick(event) {
    const button = event.target.closest('button');
    if (!button) { return; }
    const input = button.value;
    if (input === 'gameplay-screen') {
        jump();
    }
}

document.addEventListener('keydown', handleKeyboard);
document.addEventListener('click', handleClick);