//
// ***INITIALIZE GAME***
//

function initBgCanvas () {
    bgCanv = document.createElement('canvas');
    bgCanv.id = 'bgCanvas';
    bgCanv.style.position = 'absolute';
    bgCanv.style.left = '0px';
    bgCanv.style.top = '0px';
    bgCanv.style.zIndex = '0';
    bgCanv.width = wWidth;
    bgCanv.height = wHeight;
    document.body.appendChild(bgCanv);
    bgCtx = bgCanv.getContext('2d');
    uiClearBg();
}

function initGameCanvas () {
    gCanv = document.createElement('canvas');
    gCanv.id = 'gameCanvas';
    gCanv.style.position = 'absolute';
    gCanv.style.left = '0px';
    gCanv.style.top = '0px';
    gCanv.style.zIndex = '1';
    gCanv.width = wWidth;
    gCanv.height = wHeight;
    document.body.appendChild(gCanv);
    gCtx = gCanv.getContext('2d');
}

function loadGame() {
    
    addPlayers();
    
    // Initialize user interface
    uiUpdate();
   
    // Responsive
    makeResponsive();
    
    // initialize balls
    newPaddles();
    
    addBall();
    
    // Initialize controls
    initControls();
}

window.onload = function() {
    
    clock = new Clock();
    
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    
    uiSetSkin(2);
    
    // Create background canvas layer
    initBgCanvas();    
    
    // Create game canvas layer
    initGameCanvas();
    
    loadGame();
    
    // Start animation
    requestAnimationFrame(renderFrame);
};