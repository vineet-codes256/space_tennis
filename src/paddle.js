const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

const PADDLE_START_Y = 250;
const PADDLE_HORIZONTAL_SHIFT = 30;

const PADDLE_KEYBOARD_SPEED = 12;

const AI_INACCURACY_MODIFIER = 10;

class Paddle {
  constructor() {
    this.score = 0;
    this.y = 0;
    this.imgSprite = null;

    // for computer controlled paddle
    this.gotoY = 0;
    this.interceptPointFound = false;

    this.keyHeld_Up = false;
    this.keyHeld_Down = false;
  }

  setupControls(controlKeyUp, controlKeyDown) {
    this.controlKeyUp = controlKeyUp;
    this.controlKeyDown = controlKeyDown;
  }

  reset() {
    this.score = 0;
    this.y = PADDLE_START_Y;
  }

  init(x, img) {
    this.y = PADDLE_START_Y;
    this.x = x;
    this.borderLeft = this.x;
    this.borderRight = this.x + PADDLE_THICKNESS;

    this.imgSprite = img;
  }

  get borderTop() {
    return this.y;
  }

  get borderBottom() {
    return this.y + PADDLE_HEIGHT;
  }
  
  computerMove() {
    const MOVE_MARGIN = 20;

    let paddleYCenter = this.y + (PADDLE_HEIGHT/2);
    let topMoveRange = paddleYCenter - MOVE_MARGIN;
    let bottomMoveRange = paddleYCenter + MOVE_MARGIN;

    // Bigger = easier to play against computer
    let reactionTime = FPS/2;

    let bouncePredictionInaccuracy = AI_INACCURACY_MODIFIER * PADDLE_HEIGHT;

    if (ball.speedX < 0) {
      this.gotoY = canvas.height/2;
      this.interceptPointFound = false; 
    } else if (ball.speedX > 0 && ball.x > (ball.speedX * reactionTime) + ball.bounceX && this.interceptPointFound == false) {
      let interceptPoint = this.getBallInterceptPoint();
      this.gotoY = interceptPoint.y;
      this.gotoY += (Math.random() - 0.5) * interceptPoint.bouncesLeft * bouncePredictionInaccuracy;
      interceptPoint = true;
    }
    
    if (this.gotoY < topMoveRange) {
      this.y -= PADDLE_KEYBOARD_SPEED;
    } else if (this.gotoY > bottomMoveRange) {
      this.y += PADDLE_KEYBOARD_SPEED;
    }

    // Old simple AI
    // if (paddleYCenter < ball.y - 35) {
    //   paddle2.y += 6
    // } else if (paddle2YCenter > ball.y + 35) {
    //   paddle2.y -= 6
    // }
  }

  getBallInterceptPoint() {
    let ballTan = ball.speedY/ball.speedX;
    let border = (this.borderLeft + this.borderRight) /2;

	  let distanceToInterceptX = Math.abs(border - ball.x);

	  let interceptPointY = ball.y + (ballTan * distanceToInterceptX);

		let bouncesLeft = 0;

    if(interceptPointY < 0) {
      interceptPointY *= -1;
    }
    if(interceptPointY > canvas.height) {
      bouncesLeft = Math.floor(interceptPointY/canvas.height);
      interceptPointY = Math.abs((Math.ceil(bouncesLeft/2) * 2 * canvas.height) - interceptPointY);
    }

    return ({y: interceptPointY, bouncesLeft: bouncesLeft});
  }

  move() {
    if (this.keyHeld_Up && this.y > 0) {
      this.y -= PADDLE_KEYBOARD_SPEED;
    } else if (this.keyHeld_Down && this.y < (canvas.height-PADDLE_HEIGHT)) {
      this.y += PADDLE_KEYBOARD_SPEED;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y+PADDLE_HEIGHT/2, PADDLE_THICKNESS, PADDLE_HEIGHT);
  }
}