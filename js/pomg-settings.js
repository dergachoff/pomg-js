/*jshint esversion: 6, devel: true */

//
// ***SETTINGS***
//

// Ball initial speed

var ballSpeedX = 13;
var ballSpeedY = 8;
var ballSize = 15;

const ORIGINAL_SPEED_X = 13;
const ORIGINAL_SPEED_Y = 8;
const ORIGINAL_SIZE = 15;

// Scores

const WINNING_SCORE = 3;

// Paddle settings

const PADDLE_HEIGHT = 150;
const PADDLE_THICKNESS = 30;
const MAX_PLAYERS = 2;

// Color palette

var colorDark = '#2f2f2f';
var colorOne = '#dc7f9b';
var colorTwo = '#f7a1c4';
var colorThree = '#e0b7b7';
var colorFour = '#94bfa7';

// UI & Object colors

var bgColor;
var ballColor;
var paddle1Color;
var paddle2Color;
var netColor;
var textColor;
var scoreColor;


// AI

const AI_SPEED = 16;
const AI_SENSE = 40;

//
// ***BASIC DECLARATIONS***
//

var gCanv, gCtx;
var bgCanv, bgCtx;
var wWidth, wHeight;

var ballX, ballY;
var numBalls;

var balls = [];
var paddles = [];
var players = [];

var lastWin = 0;

var clock;

var isGameOver = false;
var isPaused = false;

var debugMode = false;