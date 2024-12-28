import { Game } from "../lib/game.js";
import { Sprite } from "../lib/sprite.js";
import { seconds } from "../lib/time.js";

export const DOLPHIN_SPRITE_ID = "dolphin";

// It's a singleton
export class DolphinSprite extends Sprite {
  
  constructor() {

    super({
      id: DOLPHIN_SPRITE_ID,
      imageName: "dolphin-sheet",
      x: 10,
      y: 10,
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

    if (game.clock.time - this.currentFrameStartTime > seconds(0.1)) {
    
      if (this.currentFrame < 3) {

        this.currentFrame += 1

      } else {

        this.currentFrame = 0;

      }

      this.currentFrameStartTime = game.clock.time;

    }

  }

  /**
   * 
   * @param {Game} game 
   */
  paint(game) {

    const imageSheet = game.assets.getImage(this);

    const { x, y, width, height } = game.camera.transform(
      this.x,
      this.y,
      imageSheet.width / 4,
      imageSheet.height
    );

    game.graphics.ctx.drawImage(
      // the image to draw
      imageSheet,
      // the x coordinate of the left-most *part of the image* we want to render (in image coordinates)
      (imageSheet.width / 4) * this.currentFrame - 1,
      // the y coordinate of the top-most *part of the image* we want to render (in image coordinates)
      0,
      // the width of the area of the *part of the image* we want to render
      imageSheet.width / 4,
      // the height of the area of the *part of the image* we want to render
      imageSheet.height,
      // the x coordinate in viewport coordinates 
      x,
      // the y corrdinate in viewport coordinates
      y,
      // the width of the image actually rendered on the screen
      width,
      // the height of the image actually rendered on the screen
      height
    );

  }

}
