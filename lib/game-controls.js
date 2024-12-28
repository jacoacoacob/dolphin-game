
class KeyboardControl {

  /**
   * 
   * @param {string} key 
   */
  constructor(key) {
    this.key = key;
    this.isPressed = false;
  }

  /**
   * 
   * @param {KeyboardEvent} ev 
   */
  handleKeydown(ev) {
    if (ev.key === this.key) {
      this.isPressed = true;
    }
  }

  /**
   * 
   * @param {KeyboardEvent} ev 
   */
  handleKeyup(ev) {
    if (ev.key === this.key) {
      this.isPressed = false;
    }
  }

}

class MouseControl {
  
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

class TouchControl {
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


export class GameControls {

  constructor() {
    this.mouse = new MouseControl();
    this.touch = new TouchControl();

    this.spacebar = new KeyboardControl("Space");
    this.arrowUp = new KeyboardControl("ArrowUp");
    this.arrowDown = new KeyboardControl("ArrowDown");

    this.listen();
  }

  listen() {
    
    window.addEventListener("keydown", (ev) => {
      this.arrowDown.handleKeydown(ev);
      this.arrowUp.handleKeydown(ev);
      this.spacebar.handleKeydown(ev);
    });

    window.addEventListener("keyup", (ev) => {
      this.arrowDown.handleKeyup(ev);
      this.arrowUp.handleKeyup(ev);
      this.spacebar.handleKeyup(ev);
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