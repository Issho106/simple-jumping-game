const obstacles = [];

function createObstacle() {
  const obstacleElement = document.createElement('div');
  obstacleElement.classList.add('obstacle');
  document.getElementById('obstacle-container').appendChild(obstacleElement);

  const obstacle = {
    x: 800,
        y: 20,
        width: 20,
        height: 40,
        speed: 200,
        element: obstacleElement
  };
  obstacles.push(obstacle);
}

function updateObstacles(deltaTime) {

    for(const obstacle of obstacles) {
        obstacle.x -= obstacle.speed * deltaTime;
        obstacle.element.style.left = `${obstacle.x}px`;
    }
}

function spawnObstacle() {
    createObstacle();

    const randomDelay = Math.floor(Math.random() * 2000) + 1500;
    setTimeout(spawnObstacle, randomDelay);
}