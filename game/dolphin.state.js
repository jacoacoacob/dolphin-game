import { Game } from "../lib/game.js";
import { SpriteState } from "../lib/sprite-state.js";
import { secondsToMillis } from "../lib/time.js";
import { DolphinSprite } from "./dolphin.sprite.js";

export class JumpingState extends SpriteState {

  currentFrame = 0;

  startY = 0;

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  enter(_, dolphin) {
    dolphin.dy = -2.5;
    this.startY = dolphin.y;
  }

  leave(_, dolphin) {
    dolphin.dy = 0;
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  update(_game, dolphin) {
    dolphin.dy += 0.05;

    if (dolphin.y >= this.startY) {
      dolphin.y = this.startY;
      
      return "swimming";
    }
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    const imageSheet = game.assets.getImage(dolphin);

    const { x, y, width, height } = game.camera.transform(
      dolphin.x,
      dolphin.y,
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

export class SwimmingState extends SpriteState {

  currentFrame = 0;
  currentFrameStartTime = 0;

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  update(game, _dolphin) {

    if (game.inputs.spacebar.isPressed || game.inputs.touch.isPressed) {
      return "jumping";
    }

    if (game.clock.time - this.currentFrameStartTime > secondsToMillis(0.1)) {
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
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    const imageSheet = game.assets.getImage(dolphin);

    const { x, y, width, height } = game.camera.transform(
      dolphin.x,
      dolphin.y,
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