/*jshint esversion: 6, devel: true */

// Declaration of stuff

var canvas, canvasContext, canvasWidth;
var ballX, ballY;
var player1Score, player2Score, showingWinScreen;

// Ball initial speed

var ballSpeedX = 20;
var ballSpeedY = 10;

const ORIGINAL_SPEED_X = ballSpeedX;
const ORIGINAL_SPEED_Y = ballSpeedY;

// Scores

player1Score = 0;
player2Score = 0;

const WINNING_SCORE = 3;

showingWinScreen = false;

// Paddle settings

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

// Color palette

var colorDark = '#2f2f2f';
var colorOne = '#dc7f9b';
var colorTwo = '#f7a1c4';
var colorThree = '#e0b7b7';
var colorFour = '#94bfa7';

// AI

const AI_SPEED = 16;
const AI_SENSE = 40;

// Get proper mouse position even if page is scrolled
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };

}

function handleMouseClick() {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}


/* 
function init() {
    canvas = document.getElementById('gameCanvas');
    if (canvas.getContext) {
        canvasContext = canvas.getContext("2d");

        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas();
    }
}
*/

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    var framesPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
    
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas();

    canvas.addEventListener('mousedown', handleMouseClick);
    
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        });
};



function ballReset() {

    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
    }

    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = ORIGINAL_SPEED_Y;
    ballSpeedX = ORIGINAL_SPEED_X;
}

function computerMovement() {
    
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY-AI_SENSE) {
        paddle2Y += AI_SPEED;
    } else if(paddle2YCenter > ballY+AI_SENSE) {
        paddle2Y -= AI_SPEED;
    }
}

function moveEverything() {

    // don't move stuff if on winscreen
    if (showingWinScreen) {
        return;
    }
    
    computerMovement(); // AI

    // move the ball X & Y
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    // bounce off the walls

    // left wall
    if(ballX < 0) {
        if(ballY > paddle1Y &&
           ballY < paddle1Y+PADDLE_HEIGHT) {

            // turn the ball back
            ballSpeedX = -ballSpeedX;

            // distance of the ball from the middle of the paddle
            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);

            // change vertical speed depending on hit position
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++; // must be before ballReset();
            ballReset();
        }
    }


    // right wall
    if(ballX > canvas.width) {
        if(ballY > paddle2Y &&
           ballY < paddle2Y+PADDLE_HEIGHT) {

            // turn the ball back
            ballSpeedX = -ballSpeedX;

            // distance of the ball from the middle of the paddle
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);

            // change vertical speed depending on hit position
            ballSpeedY = deltaY * 0.35;

        } else {
            player1Score++; // must be before ballReset();
            ballReset();
        }
    }

    // bottom wall
    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // top wall
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

}

function drawNet() {
    for(var i=0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1, i, 2, 20, colorThree);
    }
}

function drawEverything() {
    
    // clear screen before drawing new stuff
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    
    // next line blanks out the screen with black
    colorRect(0,0,canvas.width,canvas.height,colorDark);
    
    // don't draw stuff if on winscreen
    if (showingWinScreen) {
        canvasContext.fillStyle = colorFour;
        canvasContext.textAlign = 'center';
        canvasContext.font = 'normal normal lighter 20px Helvetica';
        canvasContext.fillText("CLICK TO CONTINUE", canvas.width/2, canvas.height-(canvas.height/10));
        if (player1Score >= WINNING_SCORE) {
            canvasContext.font = 'normal normal lighter 40px Helvetica';
            canvasContext.fillText("LEFT PLAYER WINS BY " + (player1Score - player2Score) + " POINTS!", canvas.width/2, canvas.height/2);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.font = 'normal normal lighter 40px Helvetica';
            canvasContext.fillText("RIGHT PLAYER WINS BY " + (player2Score - player1Score) + " POINTS!", canvas.width/2, canvas.height/2);
        }
        
        return;
    }

    // draws the net
    drawNet();
    
    // Player 1 Paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    // Player 2 Paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    // draws score
    canvasContext.fillStyle = colorFour;
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font = 'normal normal 100 700px Helvetica Neue';
    canvasContext.fillText(player1Score, canvas.width/4, canvas.height/2);
    canvasContext.fillText(player2Score, canvas.width/2+canvas.width/4, canvas.height/2);
    
    // draws a ball
    colorCircle(ballX,ballY,10,colorOne);

}

function colorRect(leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}