//constants
const boardSize = 20;
const cellSize = 20;
const initialSnakeLength = 1;

//variables
let snake;
let food;
let direction;
let gameLoop;
let speed = 1000;

//game board element
const gameBoard = document.getElementById("game-board");

//function to start the game
function startGame() {
    snake = [
        { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) }
    ];
    food = generateFood();
    direction = "right";

    //start the game loop
    gameLoop = setInterval(updateGame, speed);
}

//function to update the game state
function updateGame() {
    //move the snake
    const head = getHead();
    const newHead = getNextHead(head);

    //check for collision with walls or snake body
    if (isCollision(newHead) || isCollisionWithSnake(newHead)) {
        gameOver();
        return;
    }

    //check if the snake eats the food
    const ateFood = isEatingFood(newHead);

    //update the snake
    snake.unshift(newHead); //add the new head

    if(snake.length > 1)
    if (!ateFood) {
        snake.pop(); //remove the tail if food is not eaten
    }

    //generate new food if it was eaten
    if (ateFood) {
        food = generateFood();
        increaseSpeed();
    }

    //render the game
    renderGame();
}

//function to get the next head position based

function getHead() {
    return snake[0];
}

//function to get the snake's head position
function getNextHead(head) {
    const { x, y } = head;

    switch (direction) {
        case "up":
            return { x: x, y: y - 1 };
        case "down":
            return { x: x, y: y + 1 };
        case "left":
            return { x: x - 1, y: y };
        case "right":
            return { x: x + 1, y: y };
    }
}

//function to increase speed
function increaseSpeed() {
    speed -= 10; // Decrease the time interval between game updates
  }

//function to check for collision with walls
function isCollision(position) {
    const { x, y } = position;
    return x < 0 || x >= boardSize || y < 0 || y >= boardSize;
}

//function to check for collision with snake body
function isCollisionWithSnake(position) {
    const { x, y } = position;
    return snake.slice(1).some(segment => segment.x === x && segment.y === y);
}

//function to check if the snake eats the food
function isEatingFood(position) {

    const { x, y } = position;
    return x === food.x && y === food.y;

}

//function to generate random food position
function generateFood() {
    let foodPosition;

    do {
        foodPosition = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        }
    } while (isCollisionWithSnake(foodPosition));

    return foodPosition;
}

//function to handle user input
function handleKeyPress(event) {
    const keyPressed = event.key;

    //update the direction based on the arrow keys
    if (keyPressed === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (keyPressed === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    else if (keyPressed === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    else if (keyPressed === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
}

//function to render the game on the board
function renderGame() {
    gameBoard.innerHTML = ""; //clear the board

    //render the snake
    // snake.forEach(function (segment) {
    //     const snakeElement = createGameElement(segment.x, segment.y, "snake");
    //     gameBoard.appendChild(snakeElement);
    // });

    for(let i=0; i<snake.length; i++)
    {
        const snakeElement = createGameElement(snake[i].x, snake[i].y, "snake");
       
        if(i == 0)
        {
            console.log('hi')
            let eye1 = document.createElement("div");;
            eye1.classList.add('eye');
            let eye2 = document.createElement("div");
            eye2.classList.add('eye');
            let tongue = document.createElement("div");
            tongue.classList.add("tongue");
            let blackspot1 = document.createElement("div");
            let blackspot2 = document.createElement("div");
            blackspot1.classList.add('bs');
            blackspot2.classList.add('bs');

            eye1.appendChild(blackspot1);
            eye2.appendChild(blackspot2);
            snakeElement.classList.add('snake-head');
            snakeElement.appendChild(eye1);
            snakeElement.appendChild(eye2);
            snakeElement.appendChild(tongue);
            
        }
        gameBoard.appendChild(snakeElement);
    }


    //render the food
    const foodElement = createGameElement(food.x, food.y, "food");
    gameBoard.appendChild(foodElement);
}

//function to create a game element (snake or food)
function createGameElement(x, y, type) {
    const element = document.createElement("div");
    element.style.gridRowStart = y + 1;
    element.style.gridColumnStart = x + 1;
    element.classList.add(type);
    return element;
}

//function to end the game
function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${snake.length - initialSnakeLength}`);
    //additional logic to restart the game if desired
}

//event listener for key press events
window.addEventListener("keydown", handleKeyPress);

//start the game
startGame();










