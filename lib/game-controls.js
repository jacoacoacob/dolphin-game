
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


export class GameControls {

  constructor() {
    this.mouse = new MouseControl();

    this.spacebar = new KeyboardControl("Space");
    this.arrowUp = new KeyboardControl("ArrowUp");
    this.arrowDown = new KeyboardControl("ArrowDown");
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

  }

}