// Declare Variables
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 1000;
const boardHeight = 400;
const ballDiameter = 20;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

const userStart = [450, 10];
let currentPosition = userStart;

const ballStart = [490, 40];
let ballCurrentPosition = ballStart;

// Dynamically adding the blocks
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 370),
  new Block(120, 370),
  new Block(230, 370),
  new Block(340, 370),
  new Block(450, 370),
  new Block(560, 370),
  new Block(670, 370),
  new Block(780, 370),
  new Block(890, 370),
  new Block(10, 340),
  new Block(120, 340),
  new Block(230, 340),
  new Block(340, 340),
  new Block(450, 340),
  new Block(560, 340),
  new Block(670, 340),
  new Block(780, 340),
  new Block(890, 340),
  new Block(10, 310),
  new Block(120, 310),
  new Block(230, 310),
  new Block(340, 310),
  new Block(450, 310),
  new Block(560, 310),
  new Block(670, 310),
  new Block(780, 310),
  new Block(890, 310),
  new Block(10, 280),
  new Block(120, 280),
  new Block(230, 280),
  new Block(340, 280),
  new Block(450, 280),
  new Block(560, 280),
  new Block(670, 280),
  new Block(780, 280),
  new Block(890, 280),
  new Block(10, 250),
  new Block(120, 250),
  new Block(230, 250),
  new Block(340, 250),
  new Block(450, 250),
  new Block(560, 250),
  new Block(670, 250),
  new Block(780, 250),
  new Block(890, 250),
  new Block(10, 220),
  new Block(120, 220),
  new Block(230, 220),
  new Block(340, 220),
  new Block(450, 220),
  new Block(560, 220),
  new Block(670, 220),
  new Block(780, 220),
  new Block(890, 220),
  new Block(10, 190),
  new Block(120, 190),
  new Block(230, 190),
  new Block(340, 190),
  new Block(450, 190),
  new Block(560, 190),
  new Block(670, 190),
  new Block(780, 190),
  new Block(890, 190),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

//Creating User
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

drawUser();

//User Control with the left and right arrows
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

//Ball Positioning
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

drawBall();

//Ball's movement
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

//Activating the Start Button
function start() {
  timerId = setInterval(moveBall, 18);
  document.addEventListener("keydown", moveUser);
}

//Checking for collisions between the ball and blocks
function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "YOU WIN";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You Lose";
    document.removeEventListener("keydown", moveUser);
  }
}

//Determining the ball's bounceback and direction
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
