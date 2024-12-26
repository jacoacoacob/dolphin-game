import { Game } from "./game.js";
import { loadImage } from "./load-image.js";

/**
 * @typedef SpriteOptions
 * @property {string} id a unique identifier for the sprite
 * @property {string} imageSrc the path to the image file to load for this sprite
 * @property {number} x the sprite's starting x position (in world coordinates)
 * @property {number} y the sprite's starting y position (in world coordinates)
 * @property {number} width the sprite's width
 * @property {number} height the sprite's height
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
    id = "",
    imageSrc = "",
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    zIndex = 0,
    isCollidable = false,
  } = {}) {

    this.id = id;

    this.imageSrc = imageSrc;

    this.x = x;
    
    this.y = y;

    this.width = width;

    this.height = height;

    this.zIndex = zIndex;

    this.isCollidable = isCollidable;

    this.isMovable = isMovable;

    this.image = new Image();

  }

  loadImage() {
    
    return new Promise((resolve, reject) => {
    
      this.image.src = path;

      this.image.onload = function(_ev) {
        
        resolve();
      
      };

      this.image.onerror = function(_ev, source, line, col, error) {
        
        reject({ source, line, col, error });
      
      }

    });

  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {}


}