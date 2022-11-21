const FPS = 30;

let canvas;
let canvasContext;

let audioFormat = ".mp3";

let musicBackground = new MusicWrapper();
let soundBallHit = new SoundWrapper('assets/sounds/hit');
let soundBallWallHit = new SoundWrapper('assets/sounds/wall-hit');
let soundBallMiss = new SoundWrapper('assets/sounds/miss');

let isTwoPlayerMode = false;

let ball = new Ball();

let paddle1 = new Paddle();
let paddle2 = new Paddle();

const WINNING_SCORE = 5;

let showingMenuScreen = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  initInput();
  loadImages();

  ball.reset();
}


function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);

  showingMenuScreen = true;

  paddle1.init(PADDLE_HORIZONTAL_SHIFT + PADDLE_THICKNESS, paddlePic);  
  paddle2.init(canvas.width - PADDLE_THICKNESS - PADDLE_HORIZONTAL_SHIFT, paddlePic);  
  ball.init(ballPic);
}

function restartGame() {
  paddle1.reset();
  paddle2.reset();
  showingMenuScreen = false;
  musicBackground.loopMusic('assets/sounds/Blow');
}

function update() {
  if(showingMenuScreen) {

    return;
  }

  paddle1.move();

  if (!isTwoPlayerMode) {
    paddle2.computerMove();
  } else {
    paddle2.move();
  }

  ball.move();
}

function draw() {	
  // background
  drawImageCenteredAtLocationWithScaling(bgPic, canvas.width/2, canvas.height/2, canvas.width, canvas.height);

  if(showingMenuScreen) {
    canvasContext.font = "30px Comic sans bold";
    canvasContext.fillStyle = 'white';

    if (paddle1.score >= WINNING_SCORE) {
      canvasContext.fillText("Left player won!", 280, 200);
    } else if (paddle2.score >= WINNING_SCORE) {
      canvasContext.fillText("Right player won!", 280, 200);
    }

    canvasContext.fillText("Press 1 for single-player with a mouse", 120, 290);
    canvasContext.fillText("Press 2 for 2-player with a keyboard", 120, 330);
    return;
  }

  // paddles
  paddle1.draw();
  paddle2.draw();
 
  // ball
  ball.draw();

  canvasContext.fillStyle = 'white';
  
  canvasContext.font = "70px Arial bold";
  canvasContext.fillText(paddle1.score, 100, 160)
  canvasContext.fillText(paddle2.score, canvas.width - 100, 160)
}
