const	KEY_UP_ARROW	= 38;
const	KEY_DOWN_ARROW	= 40;

const	KEY_W	= 87;
const	KEY_S	= 83;

const KEY_1 = 49;
const KEY_2 = 50;

function initInput() {
  canvas.addEventListener('mousemove', 
    function(e) {
      if (!isTwoPlayerMode) {
        let mousePos = calculateMousePos(e);
        paddle1.y = mousePos.y - PADDLE_HEIGHT/2;  
      }
    }
  );

  //canvas.addEventListener('mousedown', handleMouseClick);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  paddle1.setupControls(KEY_W, KEY_S);
  paddle2.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW);
}

// function handleMouseClick(e) {
//   if(showingMenuScreen) {
//     player1Score = 0;
//     player2Score = 0;
//     showingMenuScreen = false;
//   }
// }

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft
  let mouseY = e.clientY - rect.top - root.scrollTop

  return {
    x:mouseX,
    y:mouseY
  }
}

function keyPressed(e) {
  e.preventDefault();

  if (e.keyCode === KEY_1) {
    if (showingMenuScreen) {
      isTwoPlayerMode = false;
      restartGame();
    }
  }
  else if (e.keyCode === KEY_2) {
    if (showingMenuScreen) {
      isTwoPlayerMode = true;
      restartGame();
    }
  }
  else {
    setKeyHoldState(e.keyCode, true);
  }
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, false);
}

function setKeyHoldState(keyCode, isPressed) {
  if (keyCode === paddle1.controlKeyUp) {
    paddle1.keyHeld_Up	= isPressed;
  }
  else if (keyCode === paddle1.controlKeyDown) {
    paddle1.keyHeld_Down	= isPressed;
  }
  else if (keyCode === paddle2.controlKeyUp) {
    paddle2.keyHeld_Up	= isPressed;
  }
  else if (keyCode === paddle2.controlKeyDown) {
    paddle2.keyHeld_Down	= isPressed;
  }
}