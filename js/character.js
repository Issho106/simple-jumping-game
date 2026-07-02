let isJumping = false;
let position = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
const gravity = 400;
const jumpStrength = -300;
const groundLevel = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    velocity.y = jumpStrength;
}

function updateCharacterPosition(deltaTime) {
    position.y += velocity.y * deltaTime;
}

function applyGravity(deltaTime) {
    velocity.y += gravity * deltaTime;
}

function land() {
    isJumping = false;
    velocity.y = 0;
    position.y = groundLevel;
}

/*function update(deltaTime) {
    applyGravity.call(this, deltaTime);
    updateCharacterPosition.call(this, deltaTime);
    // Check for landing
    if (position.y >= groundLevel) {
        position.y = groundLevel;
        land.call(this);
    }
}*/

function update(deltaTime) {
    applyGravity(deltaTime);
    updateCharacterPosition(deltaTime);
    if (position.y >= groundLevel) {
        land(this);
    }
}

function handleKeyboard(event) {
    const key = event.key;
    if (key === ' ' || key === 'Spacebar') {
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