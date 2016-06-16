//
// ***UI***
//

function uiUpdate () {
    uiClearBg();
    uiDrawNet();
    uiDrawScore();
    uiDrawPlayers();
}

function uiSetSkin (num) {
    switch (num) {
        case 1:
            bgColor = colorOne;
            ballColor = colorDark;
            paddle1Color = colorFour;
            paddle2Color = colorThree;
            netColor = colorDark;
            textColor = colorDark;
            scoreColor = colorDark;
            break;
            
         case 2:
            bgColor = randomColor();
            ballColor = randomColor();
            paddle1Color = randomColor();
            paddle2Color = randomColor();
            netColor = randomColor();
            textColor = randomColor();
            scoreColor = randomColor();
            break;
            
        default:
            bgColor = colorDark;
            ballColor = colorOne;
            paddle1Color = 'white';
            paddle2Color = 'white';
            netColor = colorThree;
            textColor = colorFour;
            scoreColor = colorFour;
    }
}

function uiDrawScore(){
    writeText(players[0].score,scoreColor,'center','normal normal 100 700px Helvetica Neue','middle',wWidth/4,wHeight/2,bgCtx);
    
    writeText(players[1].score,scoreColor,'center','normal normal 100 700px Helvetica Neue','middle',wWidth/2+wWidth/4,wHeight/2,bgCtx);
}

function uiDrawNet() {
    for(var i=0; i<wHeight; i+=20) {
        drawRect(wWidth/2-1, i, 2, 10, netColor,bgCtx);
    }
}

function uiClearBg() {
    fillCanvas(bgCanv,bgCtx,bgColor);
}

function uiDrawPlayers() {
    writeText(players[0].name,textColor,'center','normal normal 100 40px Helvetica Neue','middle',wWidth/4,wHeight/10,bgCtx);
    
    writeText(players[1].name,textColor,'center','normal normal 100 40px Helvetica Neue','middle',wWidth/4*3,wHeight/10,bgCtx);
}


//
// ***SCREENS***
//

function uiScreenGameOver() {
    
    drawRect(0,0,wWidth,wHeight,'rgba(0,0,0,.4)',gCtx);
    
    writeText('CLICK TO CONTINUE',textColor,'center','normal normal lighter 20px Helvetica','middle',wWidth/2,wHeight-wHeight/10,bgCtx);
        
    if (players[0].score >= WINNING_SCORE) {

        writeText(players[0].name + " WINS BY " + (players[0].score - players[1].score) + " POINTS!",textColor,'center','normal normal lighter 40px Helvetica','middle',wWidth/2,wHeight/2,bgCtx);

    } else if (players[1].score >= WINNING_SCORE) {

        writeText(players[1].name + " WINS BY " + (players[1].score - players[0].score) + " POINTS!",textColor,'center','normal normal lighter 40px Helvetica','middle',wWidth/2,wHeight/2,bgCtx);

    }
}

function uiScreenPause() {
    drawRect(0,0,wWidth,wHeight,'rgba(0,0,0,.4)',gCtx);
    
    writeText("PAUSED",textColor,'center','normal normal lighter 40px Helvetica','middle',wWidth/2,wHeight/2,gCtx);
}

