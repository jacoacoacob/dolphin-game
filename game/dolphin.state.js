import { Game } from "../lib/game.js";
import { SpriteState } from "../lib/sprite-state.js";
import { secondsToMillis } from "../lib/time.js";
import { DolphinSprite } from "./dolphin.sprite.js";

/**
 * 
 * @param {Game} game 
 * @param {DolphinSprite} dolphin 
 * @param {SwimmingState} state
 */
function paintDolphin(game, dolphin, state) {
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
    (imageSheet.width / 4) * (state.currentFrame ?? 0) - 1,
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

/**
 * 
 * @param {Game} game 
 * @param {DolphinSprite} dolphin 
 * @param {State} state
 */
function updateSwimmingDolphin(game, _dolphin, state) {
  if (state.currentFrame === undefined) {
    return;
  }

  if (game.clock.currentTime - state.currentFrameStartTime > secondsToMillis(0.1)) {
    if (state.currentFrame < 3) {
      state.currentFrame += 1
    } else {
      state.currentFrame = 0;
    }
    state.currentFrameStartTime = game.clock.currentTime;
  }
}

export class JumpingState extends SpriteState {

  currentFrame = 0;

  startY = 0;

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  enter(_, dolphin) {
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
  update(game, dolphin) {
    dolphin.dy += game.clock.throttle(0.1);

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
    paintDolphin(game, dolphin, this);
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
  update(game, dolphin) {

    if (game.inputs.spacebar.isPressed || game.inputs.touch.isPressed) {
      return "charging";
    }

    updateSwimmingDolphin(game, dolphin, this);
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    paintDolphin(game, dolphin, this);
  }
}

const INITIAL_CHARGE_LEVEL = 1.8;

export class ChargingState extends SpriteState {

  currentFrame = 0;

  chargeLevel = INITIAL_CHARGE_LEVEL;
  chargeRate = 0.05;
  maxCharge = 3.5;

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  leave(game, dolphin) {
    dolphin.dy = -(1 * this.chargeLevel);
    this.chargeLevel = INITIAL_CHARGE_LEVEL;
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  update(game, dolphin) {
    const isCharging = (
      game.inputs.spacebar.isPressed ||
      game.inputs.touch.isPressed
    );
    
    if (!isCharging) {
      return "jumping";
    }

    if (this.chargeLevel + this.chargeRate < this.maxCharge) {
      this.chargeLevel += this.chargeRate;
    }

    updateSwimmingDolphin(game, dolphin, this);
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    paintDolphin(game, dolphin, this);
  }
}