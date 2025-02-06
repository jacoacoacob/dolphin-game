import { Game } from "./game.js";

export class GameClock {

  currentTime = window.performance.now();
  delta = 0;

  tickTock() {
    const previousTime = this.currentTime;
    
    this.currentTime = window.performance.now();
    this.delta = this.currentTime - previousTime;
  }

  /**
   * Use this function to modify the velocity of game
   * sprites in `update` functions to compensate for 
   * differences in framerate across devices.
   * 
   * @param {number} velocity 
   * @returns {number} the modified velocity
   */
  throttle(velocity) {
    return velocity * this.delta * 0.08;
  }

}
