//
// ***RENDER***
//

function drawEverything() {
    
    drawPaddles();
    
    drawBalls();
    
    uiDebug();
    
}


//
// ***TICK-TOCK***
//

function renderFrame() {
    
    clock.tick();
    
    // check if in menu and for collisions
    checkEverything();
    
    // Calculate position of objects
    moveEverything();
    
    // check for menu flags
    if (isGameOver) {
        uiScreenGameOver();
        return;
    }
    if (isPaused) {
        uiScreenPause();
        return;
    }
    
    // clear screen before drawing new stuff
    gCtx.clearRect(0,0,wWidth,wHeight);
    
    // render frame
    drawEverything();
    
    // and again
    requestAnimationFrame(renderFrame);
}

