const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const box = 20;
let score = 0;

// Snake array
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// Food position
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

// Snake direction
let direction;

// Event listener for key controls
document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.keyCode == 37 && direction != "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode == 38 && direction != "DOWN") {
    direction = "UP";
  } else if (event.keyCode == 39 && direction != "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode == 40 && direction != "UP") {
    direction = "DOWN";
  }
}

// Draw everything to the canvas
function draw() {
  // Background and food
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "#0f0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Snake movement
  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  // If the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  // Add new head
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // Game over
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your Score: " + score);
    location.reload();
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// Call draw function every 100ms
let game = setInterval(draw, 100);

// Exit game button
document.getElementById("exitGame").addEventListener("click", () => {
  clearInterval(game);
  alert("Game exited!");
  location.reload();
});
