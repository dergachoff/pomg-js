//
// ***COLLISIONS***
//

function checkCollWall() {
    var i=0;
    numBalls = balls.length;
    for (i=0; i<numBalls; i++) {
        
        // left wall
        if(balls[0].x + balls[0].radius < 0) {
                players[1].scoreGoal();
                uiUpdate();
                checkScore();
                resetBalls();
            return;
        }

        // right wall
        if(balls[0].x - balls[0].radius > wWidth) {
                players[0].scoreGoal();
                uiUpdate();
                checkScore();
                resetBalls();
            return;
        }

        // bottom wall
        
         if(balls[i].y + balls[i].radius > wHeight) {
            balls[i].reflect('y');
        }

        // top wall
        
        if(balls[i].y - balls[i].radius < 0) {
            balls[i].reflect('y');
        }
        
    }
    
}

function checkCollPaddles() {
    
    var i;
    var deltaY = 0;
    var numBalls = balls.length;
    for (i=0; i<numBalls; i++) {
        
        if(balls[i].y > paddles[0].y &&
           balls[i].y < paddles[0].y+paddles[0].height &&
           balls[i].x - balls[i].radius <= paddles[0].x + paddles[0].thickness) {


                // distance of the ball from the middle of the paddle
                deltaY = paddles[1].deltaY(balls[i].y);

                // reflect the ball
                balls[i].angle(deltaY);
            }

         if(balls[i].y > paddles[1].y &&
            balls[i].y < paddles[1].y+paddles[1].height &&
            balls[i].x + balls[i].radius >= paddles[1].x) {


                // distance of the ball from the middle of the paddle
                deltaY = paddles[1].deltaY(balls[i].y);

                 // reflect the ball
                balls[i].angle(deltaY);

            }
    }
}

function checkEverything() {
    
    // check collisions of balls with walls
    checkCollWall();
    
    // check collisions of balls with paddles
    checkCollPaddles();
    
}

function moveEverything() {
    
    if (Key.isDown(Key.B)) {
        addBall();
    }
    
    moveBalls();
    
    // AI movement
    aI(); 

}


//
// ***RULES***
//

function checkScore () {
    if (players[0].score >= WINNING_SCORE ||
        players[1].score >= WINNING_SCORE) {
            isGameOver = true;
    }
}

function resetScore() {
    var i = 0;
    for (i;i<players.length;i++) {
        players[i].score = 0;
    }
}



