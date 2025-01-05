
class KeyboardInput {

  /**
   * 
   * @param {string} key 
   */
  constructor(key) {
    this.key = key.toLowerCase();
    this.isPressed = false;
  }

  /**
   * 
   * @param {KeyboardEvent} ev 
   */
  handleKeydown(ev) {
    if (ev.key.toLowerCase() === this.key) {
      this.isPressed = true;
    }
  }

  /**
   * 
   * @param {KeyboardEvent} ev 
   */
  handleKeyup(ev) {
    if (ev.key.toLowerCase() === this.key) {
      this.isPressed = false;
    }
  }

}

class MouseInput {
  
  constructor() {
    this.isPressed = false;
  }

  /**
   * 
   * @param {MouseEvent} ev 
   */
  handleMousedown(ev) {
    this.isPressed = true;
  }

  /**
   * 
   * @param {MouseEvent} ev 
   */
  handleMouseup(ev) {
    this.isPressed = false;
  }

}

class TouchInput {
  constructor() {
    this.isPressed = false;
  }

  /**
   * 
   * @param {TouchEvent} ev 
   */
  handleTouchstart(ev) {
    this.isPressed = true;
  }

  /**
   * 
   * @param {TouchEvent} ev 
   */
  handleTouchend(ev) {
    this.isPressed = false;
  }
}


export class GameInputs {

  constructor() {
    this.mouse = new MouseInput();
    this.touch = new TouchInput();

    this.spacebar = new KeyboardInput("Space");
    this.arrowUp = new KeyboardInput("ArrowUp");
    this.arrowDown = new KeyboardInput("ArrowDown");
    this.arrowRight = new KeyboardInput("ArrowRight");
    this.arrowLeft = new KeyboardInput("ArrowLeft");
    this.a = new KeyboardInput("a");
    this.s = new KeyboardInput("s");
    this.d = new KeyboardInput("d");
    this.w = new KeyboardInput("w");

    this.listen();
  }

  listen() {
    
    window.addEventListener("keydown", (ev) => {
      this.arrowDown.handleKeydown(ev);
      this.arrowUp.handleKeydown(ev);
      this.arrowLeft.handleKeydown(ev);
      this.arrowRight.handleKeydown(ev);
      this.spacebar.handleKeydown(ev);
      this.a.handleKeydown(ev);
      this.s.handleKeydown(ev);
      this.d.handleKeydown(ev);
      this.w.handleKeydown(ev);
    });

    window.addEventListener("keyup", (ev) => {
      this.arrowDown.handleKeyup(ev);
      this.arrowUp.handleKeyup(ev);
      this.arrowLeft.handleKeyup(ev);
      this.arrowRight.handleKeyup(ev);
      this.spacebar.handleKeyup(ev);
      this.a.handleKeyup(ev);
      this.s.handleKeyup(ev);
      this.d.handleKeyup(ev);
      this.w.handleKeyup(ev);
    });

    window.addEventListener("mousedown", (ev) => {
      this.mouse.handleMousedown(ev);
    });

    window.addEventListener("mouseup", (ev) => {
      this.mouse.handleMouseup(ev);
    });

    window.addEventListener("touchstart", (ev) => {
      this.touch.handleTouchstart(ev);
    });

    window.addEventListener("touchend", (ev) => {
      this.touch.handleTouchend(ev);
    });

  }

}