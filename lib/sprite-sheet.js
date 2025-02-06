import { Game } from "./game.js";
import { Sprite } from "./sprite.js";

export class SpriteSheet {
  currentFrame = 0;
  currentFrameStartTime = 0;

  /**
   * 
   * @param {number} nFrames 
   * @param {number} refreshRate the duration in milliseconds between each update of currentFrame 
   */
  constructor(nFrames = 0, refreshRate = 100) {
    this.nFrames = nFrames;
    this.refreshRate = refreshRate;
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {
    if (this.nFrames < 1) {
      return;
    }

    if (game.clock.currentTime - this.currentFrameStartTime > this.refreshRate) {
      this.currentFrame = (this.currentFrame + 1) % this.nFrames;
      this.currentFrameStartTime = game.clock.currentTime;
    }
  }

  /**
   * 
   * @param {Game} game 
   * @param {Sprite} sprite 
   * @param {any} options
   */  
  paint(game, sprite, options = {}) {
    const imageSheet = game.assets.getImage(sprite);

    if (imageSheet) {
      const { x, y, width, height } = game.camera.transform(
        sprite.x,
        sprite.y,
        imageSheet.width / this.nFrames,
        imageSheet.height
      );

      if (options.outline) {
        game.graphics.ctx.strokeStyle = "blue";
        game.graphics.ctx.strokeRect(
          x,
          y,
          width,
          height
        )
      }

      game.graphics.ctx.drawImage(
        // the image to draw
        imageSheet,
        // the x coordinate of the left-most *part of the image* we want to render (in image coordinates)
        imageSheet.width / this.nFrames * this.currentFrame - 1,
        // the y coordinate of the top-most *part of the image* we want to render (in image coordinates)
        0,
        // the width of the area of the *part of the image* we want to render
        imageSheet.width / this.nFrames,
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
}