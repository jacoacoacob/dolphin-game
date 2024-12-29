import { Game } from "./game.js";
import { randId } from "./rand-id.js";

/**
 * @typedef SpriteOptions
 * @property {string} id a unique identifier for the sprite
 * @property {string | undefined} kind use this to specify a category this sprite belings to (e.g. "star" or "coin")
 * @property {string} imageName the name of the image in game.assets.images that represents this sprite
 * @property {number} x the sprite's starting x position (in world coordinates)
 * @property {number} y the sprite's starting y position (in world coordinates)
 * @property {number} zIndex sprite's with higher zIndex values will appear in front of ones with lower zIndex values
 * @property {boolean} isCollidable if true, this sprite can collide with other objects in its plane of 2D space
 * @property {boolean} isMovable if true, this sprite can be moved by foces of gravity, player input, or collision with another sprite
 */


export class Sprite {

  /**
   * 
   * @param {SpriteOptions} param0 
   */
  constructor({
    id = randId(),
    kind,
    imageName = "",
    x = 0,
    y = 0,
    zIndex = 0,
    isCollidable = false,
    isMovable = false,
  } = {}) {

    this.id = id;

    this.kind = kind;

    this.imageName = imageName;

    this.x = x;
    
    this.y = y;

    this.zIndex = zIndex;

    this.isCollidable = isCollidable;

    this.isMovable = isMovable;

  }

  /**
   * 
   * @param {Game} game 
   * @returns 
   */
  width(game) {
    
    return game.assets.images[this.imageName].width;

  }

  /**
   * 
   * @param {Game} game 
   */
  height(game) {

    return game.assets.images[this.imageName].height;

  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {}
  
  /**
   * 
   * @param {Game} game 
  */
  paint(game) {

    game.graphics.ctx.drawImage(
      game.assets.getImage(this),
      this.x,
      this.y
    );

  }

}