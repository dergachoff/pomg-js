function uiDebug() {
    if (debugMode) {
        
        var debugTxt = []
        
        debugTxt[0] = lastWin + ' | ' + 'Paddle 2 Y: ' + paddles[1].y + ' | Ball 0: x ' + balls[0].x + ' / y ' + balls[0].y + ' / speedX '+ balls[0].speedX + ' / speedY '+ balls[0].speedY;
        
        debugTxt[1] =  clock.fps + ' FPS';
        
        writeText(debugTxt[1],'red','center','20px Helvetica','middle',wWidth/2,wHeight-40,gCtx);
    }
}