import type { Game } from "./game.js";
import type { Sprite } from "./sprite.js";

export interface SpriteState<S extends Sprite> {
  enter: (game: Game, sprite: S) => void;
  leave: (game: Game, sprite: S) => void;
  paint: (game: Game, sprite: S) => void;
  update: (game: Game, sprite: S) => keyof S["states"] | undefined;
}

// export class SpriteState<S extends Sprite> implements ISpriteState<S> {

//   enter(game: Game, sprite: S) {}

//   /**
//    * @param {Game} game 
//    * @param {Sprite} sprite
//    */
//   leave(game, sprite) {}

//   /**
//    * 
//    * @param {Game} game 
//    * @param {Sprite} sprite 
//    */
//   paint(game, sprite) {}

//   /**
//    * Respond to input from game controls
//    * @param {Game} game 
//    * @param {Sprite} sprite

//    */
//   update(game, sprite) {}

// }
