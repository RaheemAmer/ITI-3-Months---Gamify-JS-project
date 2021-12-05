
// variables

    // for game body
var grid = document.getElementById("game-body");
var bodyWidth = 600;
var bodyHeight = 300;


    // for blocks and user block
var blockWidth = 100;
var blockHeight = 20;

    // for the ball
var xDirection = 2
var yDirection = 2
var ballStart = [250, 40]
var ballCurrentPosition = ballStart

    //for user
var userStart = [230, 10];
var currentPosition = userStart


    // for interval 
var timerId;

    // for score
var displayScore = document.querySelector("#score")


//create class for blocks to Generate 

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

var blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 270),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(10, 210),
]

// add blocks function and call i

function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        var block = document.createElement("div");
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block);
    }

}

addBlocks();


// user

var user = document.createElement('div');
user.classList.add('user');
drawUser()
grid.appendChild(user)

//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// move user (controller)
function moveUser(e) {

    switch (e.key) {
        case 'ArrowLeft':

            if (currentPosition[0] === 0) {
                break;
            }

            currentPosition[0] -= 10
            drawUser()
            break;

        case 'ArrowRight':

            if (currentPosition[0] === 500) {
                break;
            }

            currentPosition[0] += 10
            drawUser()
            break;
    }
}
document.addEventListener('keydown', moveUser)

//  ------------------------___________-----------------___________---------------


// create the ball

var ball = document.createElement("div");
ball.classList.add("myBall");
drawBall()
grid.appendChild(ball);

// draw ball

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';

}

// move the ball 

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall()
    checkWalls()
    GameStatus()
}

// for start game
function startGame() {
    timerId = setInterval(moveBall, 15)
}

// check the walls

//attention -_-
function killBlocks(){
    for (i = 0; i < blocks.length; i++) {

        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            (ballCurrentPosition[1] + 12.5) > blocks[i].bottomLeft[1] && (ballCurrentPosition[1] + 12.5) < blocks[i].topLeft[1]) {
            blocks.splice(i, 1);
            var allBlocks = Array.from(document.querySelectorAll(".block"));
            allBlocks[i].classList.remove("block")
            console.log(allBlocks)
            changeDirection()
            displayScore.innerHTML++;

        }

    }
}

function checkWalls() {


// to kill blocks
killBlocks()


/* ----------for walls and blocks change direction-------- */

if (ballCurrentPosition[0] >= (bodyWidth - 12.5) || ballCurrentPosition[1] >= (bodyHeight - 12.5) || ballCurrentPosition[0] <= 0) {
    changeDirection()
}

    


/* ----------for User Block-------- */

    if (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth) && ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < (currentPosition[1] + blockHeight)) {
        changeDirection()
    }


    
}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2; // to make the ball bounce back (not stay in a straight line to X)
        console.log("test1");
        return
    } else if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        console.log("test2");
        return
    } else if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        console.log("test3");
        return
    } else if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        console.log("test4");
        return
    }
}


// check for Game over

function GameStatus(){
    if (ballCurrentPosition[1] === 0) {
        Swal.fire(
            'you Lose!',
            'click to start new game',
            'warning'
          ).then(()=> location.reload())
        displayScore.innerHTML = "Game Over"
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
        displayScore = 0
    }else if(blocks.length ===0){
        Swal.fire(
            'Winner Winner!',
            'click to start new game',
            'success'
          ).then(()=> location.reload())
        displayScore.innerHTML = "Winner !!!";
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);


    }
}