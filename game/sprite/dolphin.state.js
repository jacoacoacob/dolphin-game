import { Game } from "../../lib/game.js";
import { SpriteState } from "../../lib/sprite-state.js";
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
    dolphin.dy += game.clock.throttle(0.08);

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
    dolphin.spriteSheet.paint(game, dolphin);
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

    dolphin.spriteSheet.update(game);
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    dolphin.spriteSheet.paint(game, dolphin);
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

    dolphin.spriteSheet.update(game);
  }

  /**
   * 
   * @param {Game} game 
   * @param {DolphinSprite} dolphin 
   */
  paint(game, dolphin) {
    dolphin.spriteSheet.paint(game, dolphin);
  }
}