const obstacles = [];

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

function spawnObstacle() {
    createObstacle();

    const randomDelay = Math.floor(Math.random() * 2000) + 1500;
    setTimeout(spawnObstacle, randomDelay);
}