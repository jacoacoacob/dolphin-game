import { Game } from "../lib/game.js";
import { Sprite } from "../lib/sprite.js";
import { secondsToMillis } from "../lib/time.js";
import { JumpingState, SwimmingState } from "./dolphin.state.js";

export const DOLPHIN_SPRITE_ID = "dolphin";

// It's a singleton
export class DolphinSprite extends Sprite {

  states = {
    swimming: new SwimmingState(),
    jumping: new JumpingState(),
  };

  /** @type {keyof typeof this.states} */
  state = "swimming";
  
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super({
      id: DOLPHIN_SPRITE_ID,
      imageName: "dolphin-sheet",
      x,
      y,
      zIndex: 10,
      isCollidable: true,
      isMovable: true,
    });
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {
    this.updatePosition(game);

    const newState = this.states[this.state].update(game, this);

    if (newState) {
      this.setState(game, newState);
    }
  }

  /**
   * 
   * @param {Game} game 
   */
  paint(game) {
    return this.states[this.state].paint(game, this);
  }

}
