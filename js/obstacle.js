let obstacles = [];
characterElement = new Character(50, 0);

function createObstacle() {
    const obstacleElement = document.createElement('div');
    obstacleElement.classList.add('obstacle');

    const obstacle = {
        x: 800,
        y: 20,
        width: 20,
        height: 40,
        speed: 200,
        element: obstacleElement
    };

    obstacleElement.style.left = `${obstacle.x}px`;
    document.getElementById('obstacle-container').appendChild(obstacleElement);

    obstacles.push(obstacle);
}

function updateObstacles(deltaTime) {

    for(const obstacle of obstacles) {
        obstacle.x -= obstacle.speed * deltaTime;
        obstacle.element.style.left = `${obstacle.x}px`;

        if(obstacle.x + obstacle.width < 0) {
            obstacle.element.remove();
            obstacles.splice(obstacles.indexOf(obstacle), 1);
        }
    }
}

function checkCollisions() {
    const player = characterElement.getCharacterBounds();

    for (const obstacle of obstacles) {

        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            console.log('Collision detected!');
            gameOver();
        }

    }
}

function spawnObstacle() {
    createObstacle();

    const randomDelay = Math.floor(Math.random() * 2000) + 1500;
    setTimeout(spawnObstacle, randomDelay);
}

function resetObstacles() {
    const container = document.getElementById('obstacle-container');
    if(container) {
        container.innerHTML = '';
    }
    obstacles = [];
}