//
// ***PLAYER CONTROLS***
//


// Initialize controls

function initControls(){
    // Mouse move paddle control
    window.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddles[0].y = mousePos.y-(paddles[0].height/2);
        });
    
    // Mouse click
    gCanv.addEventListener('mousedown', handleMouseClick);
    
    // LOOK FOR LONG KEY PRESSES
    
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    
    // LOOK FOR SINGLE KEY PRESSES
    
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 66:
                addBall();
                break;
            case 80:
                isPaused = isPaused ? false : true;
                break;
            case 68:
                debugMode = debugMode ? false : true;
                break;
        }
        
    });
}


// Get proper mouse position even if page is scrolled
function calculateMousePos(evt) {
    var rect = gCanv.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

// Handling mouse click
function handleMouseClick() {
    if (isGameOver) {
        resetScore();
        isGameOver = false;
        uiUpdate();
        requestAnimationFrame(renderFrame);
    }
    if (isPaused) {
        isPaused = false;
        requestAnimationFrame(renderFrame);
        uiUpdate();
    }
}

// Handling keyboard for long presses
var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    //A: 65,
    S: 83,
    //D: 68;
    //F: 70,
    //B: 66,
    //P: 80,
    //SPACE: 32,
  
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
  
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
  
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};



//
// ***AI***
//

function aI() {
    
//    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
//    if (paddle2YCenter < ballY-AI_SENSE) {
//        paddle2Y += AI_SPEED;
//    } else if(paddle2YCenter > ballY+AI_SENSE) {
//        paddle2Y -= AI_SPEED;
//    }
//    
    var padCenter = paddles[1].y + paddles[1].height/2;
    if (padCenter < balls[0].y - AI_SENSE) {
        paddles[1].y += AI_SPEED * clock.delta * 30;
    } else if (padCenter > balls[0].y + AI_SENSE) {
        paddles[1].y -= AI_SPEED * clock.delta * 30;
    }
    
//    if (paddles[1].center < ballY - AI_SENSE) {
//        paddles[1].y += AI_SPEED;
//    } else if (paddles[1].center > ballY + AI_SENSE) {
//        paddles[1].y -= AI_SPEED;
//    }
}