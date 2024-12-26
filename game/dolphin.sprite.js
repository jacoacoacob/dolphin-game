import { Game } from "../lib/game.js";
import { Sprite } from "../lib/sprite.js";
import { seconds } from "../lib/time.js";

export class DolphinSprite extends Sprite {
  
  constructor() {

    super({
      id: "dolphin",
      imageSrc: "../assets/dolphin-baby/16bit-dolphin-baby-Sheet.png",
      x: 0,
      y: 0,
      width: 16 * 4,
      height: 16 * 4,
      zIndex: 10,
      isCollidable: true,
      isMovable: true,
    });

    this.currentFrame = 0;

    this.currentFrameStartTime = 0;
  
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {

    if (game.clock.time - this.currentFrameStartTime > seconds(0.05)) {
    
      if (this.currentFrame < 3) {

        this.currentFrame += 1

      } else {

        this.currentFrame = 0;

      }

    }

  }

}
