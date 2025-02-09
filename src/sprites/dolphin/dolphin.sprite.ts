import { DOLPHIN_SPRITE_ID } from "../dolphin.sprite.js";
import type { Game } from "../../lib/game.js";
import { SpriteSheet } from "../../lib/sprite-sheet.js";
import { Sprite } from "../../lib/sprite.js";
import { ChargingState, JumpingState, SwimmingState } from "./dolphin.state.js";

// It's a singleton
export class DolphinSprite extends Sprite {

  spriteSheet = new SpriteSheet({ nFrames: 4, refreshRate: 100 });

  states = {
    swimming: new SwimmingState(),
    charging: new ChargingState(),
    jumping: new JumpingState(),
  };

  state: keyof typeof this.states = "swimming";
  
  constructor(x: number, y: number) {
    super({
      id: DOLPHIN_SPRITE_ID,
      imageName: "dolphin-sheet",
      x,
      y,
    });
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game: Game) {
    this.updatePosition(game);

    const newState = this.states[this.state].update(game, this);

    if (newState) {
      this.setState(game, newState);
    }
  }

  paint(game: Game) {
    return this.states[this.state].paint(game, this);
  }

}
