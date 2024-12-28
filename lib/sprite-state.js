import { Game } from "./game.js";
import { Sprite } from "./sprite.js";

export class SpriteState {

  /**
   * 
   * @param {string} name 
   */
  constructor(name) {

    this.name = name;

  }

  /**
   * Respond to input from game controls
   * @param {Game} game 
   * @param {Sprite} sprite
   * @returns {string | undefined} the next state
   */
  handleInput(game, sprite) {}

  /**
   * 
   * @param {Game} game 
   * @param {Sprite} sprite 
   */
  update(game, sprite) {}

}
