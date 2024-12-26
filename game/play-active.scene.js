import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { DolphinSprite } from "./dolphin.sprite";

export class PlayActiveScene extends Scene {

  constructor() {

    super("play_active");

  }

  /**
   * 
   * @param {Game} game 
   */
  setup(game) {
    game.sprites.addSprite(new DolphinSprite());
    
  }

}
