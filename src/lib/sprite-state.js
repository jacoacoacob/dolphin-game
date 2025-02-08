import { Game } from "./game.js";
import { Sprite } from "./sprite.js";

export class SpriteState {

  /**
   * @param {Game} game 
   * @param {Sprite} sprite
   */
  enter(game, sprite) {}

  /**
   * @param {Game} game 
   * @param {Sprite} sprite
   */
  leave(game, sprite) {}

  /**
   * 
   * @param {Game} game 
   * @param {Sprite} sprite 
   */
  paint(game, sprite) {}

  /**
   * Respond to input from game controls
   * @param {Game} game 
   * @param {Sprite} sprite

   */
  update(game, sprite) {}

}
