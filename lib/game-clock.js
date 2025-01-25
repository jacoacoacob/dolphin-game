import { Game } from "./game.js";

function percentChange(v1, v2) {
  return (v2 - v1) / v1;
}

export class GameClock {

  currentTime = window.performance.now();
  delta = 0;
  simulatedFrameRate = 16;

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
    const percentChange = (this.simulatedFrameRate - this.delta) / this.simulatedFrameRate;

    if (percentChange > 0) {
      return velocity - velocity * percentChange;
    } else if (percentChange < 0) {
      return velocity + velocity * percentChange;
    }

    return velocity;
  }

}
