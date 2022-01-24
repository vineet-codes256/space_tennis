const BALL_SPEED_START = 8;
const BALL_SPEED_UP_RATE = 1.1;
const BALL_SIZE = 14;
const BALL_TRAIL_SIZE = 5;
class Ball {
  constructor() {
    this.x = 50;
    this.speedX = BALL_SPEED_START;
    this.y = 50;
    this.speedY = 10;
    this.speedYMin = 5;
    this.speedYMax = 9;

    this.bounceX = 0;

    this.trail = new Array(BALL_TRAIL_SIZE);

    this.imgSprite = null;
  }

  init(img) {
    this.imgSprite = img;
    this.reset();
  }

  reset() {
    if (paddle1.score >= WINNING_SCORE ||
      paddle2.score >= WINNING_SCORE) {
        showingMenuScreen = true;
    }
      
    this.bounceX = 0;
    this.speedX = (this.speedX > 0 ? -1 : 1) * BALL_SPEED_START;
    this.speedY = (Math.random()<0.5 ? -1 : 1)*(Math.random()*(this.speedYMax - this.speedYMin) + this.speedYMin);
    this.x = canvas.width/2
    this.y = canvas.height/2

    this.trail = this.trail.fill({x: this.x, y: this.y});
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;  

    // Collisions - paddle 1
    if (this.x > paddle1.borderRight && (this.x + this.speedX) <= paddle1.borderRight) {
      let interceptPointY = paddle1.getBallInterceptPoint().y;
      if (paddle1.borderTop <= interceptPointY && paddle1.borderBottom >= interceptPointY) {
        this.speedX = -(this.speedX * BALL_SPEED_UP_RATE);
        
        let deltaY = this.y - (paddle1.y + PADDLE_HEIGHT/2);
        this.speedY = deltaY * 0.35;
        this.bounceX = this.x;
  
        soundBallHit.play();
      }
    } else if (this.x < 0) {
      paddle2.score++;
      soundBallMiss.play();
      this.reset();
    }

    // Collisions - paddle 2
    if (this.x < paddle2.borderLeft && (this.x + this.speedX) >= paddle2.borderLeft) {
      let interceptPointY = paddle2.getBallInterceptPoint().y;
      if (paddle2.borderTop <= interceptPointY && paddle2.borderBottom >= interceptPointY) {
        this.speedX = -(this.speedX * BALL_SPEED_UP_RATE);
  
        let deltaY = this.y - (paddle2.y + PADDLE_HEIGHT/2);
        this.speedY = deltaY * 0.35;
        this.bounceX = this.x;
        
        soundBallHit.play();
      } 
    }
    else if (this.x > canvas.width)  {
      paddle1.score++;
      soundBallMiss.play();
      this.reset();
    }

    // Collisions - top and bottom walls
    if (this.y >= canvas.height || this.y <= 0) {
      soundBallWallHit.play();
      this.speedY = -this.speedY
      this.bounceX = this.x;
    }

    this.trail.shift();
    this.trail.push({x: this.x, y: this.y});
  }

  draw() {
    // trail
    for (let i=this.trail.length-1; i>=0; i--) {
      canvasContext.globalAlpha = 0.1*i;
      drawImageCenteredAtLocationWithScaling(this.imgSprite, this.trail[i].x, this.trail[i].y, BALL_SIZE, BALL_SIZE);
    }

    canvasContext.globalAlpha = 1;
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y, BALL_SIZE, BALL_SIZE);
  }
}