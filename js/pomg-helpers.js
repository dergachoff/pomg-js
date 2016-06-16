//
// ***DRAWING HELPERS***
//

function fillCanvas (canvas, context, color) {
    context.fillStyle = color;
    context.fillRect(0,0,canvas.width,canvas.height);
}

function writeText (text,color,align,font,baseline,x,y,context) {
    context.fillStyle = color;
    context.textAlign = align;
    context.textBaseline = baseline;
    context.font = font;
    context.fillText(text,x,y);
}

function drawRect(x,y,width,height,color,context) {
    context.fillStyle = color;
    context.fillRect(x,y,width,height);
}

function drawCircle(x,y,radius,color,context) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2,true);
    context.fill();
}

function randomColor() {
            return "hsl("+ Math.floor(Math.random()*360)+","+Math.floor(Math.random()*100)+"%,"+Math.floor(Math.random()*100)+"%)";
}

//
// ***HELPER FUNCS***
//

function coinToss() {
    if (Math.floor(Math.random()*20) % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

//
// ***RESPONSIVE CANVAS***
//

function resizeCanvas() {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    gCanv.width = wWidth;
    gCanv.height = wHeight;
    bgCanv.width = wWidth;
    bgCanv.height = wHeight;
    uiUpdate();
}

function makeResponsive() {
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
}



//
// ***CLOCK***
//

//var Clock = function () {

function Clock () {

    /** Member startTime will remain fixed at its integer
        millisecond value returned by Date.now(). Will always
        be equal to the time the clock was started */
    this.startTime = Date.now();

    /** Member ms is updated by tick() to a integer value reprsenting 
        the number of milliseconds between the epoch (January 1, 1970)
        and the current date and time of the system. */
    this.ms = this.startTime;
    this.last = this.startTime;  /** millis at last call to tick() */
    this.time = 0;               /** ms in floating point seconds not millis */

    /** Member dt is updated by tick() to an integer value representing
        the number of milliseconds since the last call to tick(). */
    this.dt = 0;
    this.delta = 0; /** dt in floating point seconds not millis */

    /** Member fps is updated by tick() to a floating point value representing
        frames per second, updated and averaged approximately once per second */
    this.fps = 0.0;

    /** Member frameCount is updated to an integer value representing the
        total number of calls to tick() since the clock was created. */
    this.frameCount = 0;

    /** The frameCounter member is a flag you can turn off if you don't need to
        calculate the frameCount or do the average FPS calculation every second */
    this.frameCounter = true;

    /** Private globals needed to calculcate/average fps over eachs second */
    var timeToUpdate = 0;
    var framesToUpdate = 0;

    /************************************************************************************
        The tick() method updates ALL the Clock members, which should only
        be read from and never written to manually. It is recommended that
        tick() is called from a callback loop using requestAnimationFrame

        Learn more: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    *************************************************************************************/
    this.tick = function () {
        /** This is a new frame with it's very own unique number */

        if (this.frameCounter) this.frameCount++;

        /** Set the private currentTime variable */
        this.ms = Date.now();

        /** Update time delta and immediately set last time to
            be as accurate as possible in our timings. */
        this.dt = this.ms - this.last;
        this.last = this.ms;

        /** Calculate floating-point delta and increment time member */
        this.delta = 0.001 * this.dt;
        this.time += this.delta;

        /** Calculate private temp variables for fps calculation */
        if (this.frameCounter) {
            timeToUpdate += this.dt;
            framesToUpdate++;
            if (timeToUpdate > 1000) {
                this.fps = Math.round((framesToUpdate * 1000) / timeToUpdate);
                framesToUpdate = 0;
                timeToUpdate = 0;
            }
        }
    }
}