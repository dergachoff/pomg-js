//
// ***PLAYER***
//

function Player (num, name, isAi) {
    this.num = num;
    this.isAi = isAi;
    this.name = name;
    
    this.init = function() {
        this.score = 0;
        this.lastWin = false;
    }
    this.init();
    
    this.scoreGoal = function() {
        this.score++;
        lastWin = this.num;
    }
}



function addPlayers(num) {
    var newPlayer = new Player(1,'Player 1',false);
    players.push(newPlayer);
    
    newPlayer = new Player(2,'Bob',true);
    players.push(newPlayer);
}

//
// ***PADDLE***
//

function Paddle(side) {
    this.side = side;
    this.init = function () {
        this.height = typeof height !== 'undefined' ? height : PADDLE_HEIGHT;
        this.thickness = typeof thickness !== 'undefined' ? thickness : PADDLE_THICKNESS;
        this.color = typeof color !== 'undefined' ? color : paddle1Color;
        this.y = typeof y !== 'undefined' ? y : wHeight/2-this.height/2;
        this.stickToSide(this.side);
    }
    
    this.stickToSide = function(side) {
        switch (side) {
                case 'left':
                    this.x = 0;
                    break;
                case 'right':
                    this.x = wWidth-this.thickness;
            }
    }
    
    
    
    this.init();
    
}

Paddle.prototype.move = function(direction) {
    switch (direction) {
            case 'up':
                if (this.y > 0) {
                    this.y -= 20;
                }
            break;
            case 'down':
                if (this.y+this.height < wHeight) {
                    this.y += 20;
                }
            break;
    }
}


Paddle.prototype.draw = function() {
    this.stickToSide(this.side);
    drawRect(this.x,this.y,this.thickness,this.height,this.color,gCtx);
}

Paddle.prototype.deltaY = function(ypos) {
    return ypos - (this.y+this.height/2);
}


function newPaddles() {
    paddles[0] = new Paddle('left');
    paddles[1] = new Paddle('right');
}

function movePaddles() {
    if (Key.isDown(Key.UP) || Key.isDown(Key.W)) { paddles[0].move('up'); }
    if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) { paddles[0].move('down'); }
}

function drawPaddles() {
    paddles[0].draw();
    paddles[1].draw();
}


//
// ***BALL***
//

function Ball(x,y,speedX,speedY,radius,color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
}

// Draw the ball

Ball.prototype.draw = function() {   
    drawCircle(this.x,this.y,this.radius,this.color,gCtx);
};

// Calculate ball's new position

Ball.prototype.move = function() {
    this.x += this.speedX * clock.delta;
    this.y += this.speedY * clock.delta;
    
};

// Reflect x or y

Ball.prototype.reflect = function(option) {
    switch (option) {
        case 'x':
            this.speedX *= -1;
        case 'y':
            this.speedY *= -1;
    }
}

Ball.prototype.angle = function(delta) {
    this.reflect('x');
    this.speedY += Math.floor(delta) * 22;
}



// Add new ball to array

function addBall(){
    var spX = Math.floor(Math.random()*1000) + 500;
    var spY = Math.floor(Math.random()*500) + 100;
    if (lastWin && lastWin === 1) {
        lastWin = 0;
    } else if (lastWin && lastWin === 2) {
        spX *= -1;
        lastWin = 0;
    } else {
        if (coinToss()) {
            spX *= -1;
        }
    }
    
    if (coinToss()) {
            spY *= -1;
        }
    
    var ball = new Ball(wWidth/2,wHeight/2,spX,spY,ballSize,randomColor());
    balls.push(ball);
}

// Update positions of all balls

function moveBalls() {
    for (var i=0; i<balls.length; i++) {
        balls[i].move();
    }
}

// Draw all balls

function drawBalls() {
    for (var i=0; i<balls.length; i++) {
        balls[i].draw();
    }
}

function resetBalls() {
    balls = [];
    addBall();
}



