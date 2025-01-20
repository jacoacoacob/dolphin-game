import { Game } from "./game.js";
import { randId } from "./rand-id.js";
import { SpriteState } from "./sprite-state.js";

/**
 * @typedef SpriteOptions
 * @property {string} id a unique identifier for the sprite
 * @property {string | undefined} kind use this to specify a category this sprite belings to (e.g. "star" or "coin")
 * @property {string} imageName the name of the image in game.assets.images that represents this sprite
 * @property {number} x the sprite's starting x position (in world coordinates)
 * @property {number} y the sprite's starting y position (in world coordinates)
 * @property {number | undefined} width the sprite's width (in world coordinates). If not defined, will default to width of image.
 * @property {number | undefined} height the sprite's height (in world coordinates). If not defined, will default to height of image.
 * @property {number} zIndex sprite's with higher zIndex values will appear in front of ones with lower zIndex values
 * @property {boolean} isCollidable if true, this sprite can collide with other objects in its plane of 2D space
 * @property {boolean} isMovable if true, this sprite can be moved by foces of gravity, player input, or collision with another sprite
 */


export class Sprite {

  dx = 0;
  dy = 0;

  state = "";

  /**
   * @type {Record<string, SpriteState>}
   */
  states = {};

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
    width,
    height,
    zIndex = 0,
    isCollidable = false,
    isMovable = false,
  } = {}) {

    this.id = id;

    this.kind = kind;

    this.imageName = imageName;

    this.x = x;
    
    this.y = y;

    this._width = width;

    this._height = height;

    this.zIndex = zIndex;

    this.isCollidable = isCollidable;

    this.isMovable = isMovable;

  }


  /**
   * 
   * @param {Game} game 
   * @param {string} newState 
   */
  setState(game, newState) {
    const prevState = this.state;
    
    this.state = newState;

    if (this.states[prevState]) {
      this.states[prevState].leave(game, this);
    }

    this.states[this.state].enter(game, this);
  }

  /**
   * 
   * @param {Game} game 
   */
  updatePosition(game) {
    this.x += this.dx;
    this.y += this.dy;
  }

  /**
   * 
   * @param {Game} game 
   * @returns 
   */
  width(game) {
    if (typeof this._width === "number") {
      return this._width;
    }

    return game.assets.images[this.imageName].width;
  }

  /**
   * 
   * @param {Game} game 
   */
  height(game) {
    if (typeof this._height === "number") {
      return this._height;
    }

    return game.assets.images[this.imageName].height;
  }
  
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