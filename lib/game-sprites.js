import { Sprite } from "./sprite.js";

export class GameSprites {
  
  constructor() {

    this.sprites = {};

  }

  /**
   * 
   * @param {string | string[]} selector a spriteId or an array of spriteIds
   * @returns {Sprite | Sprite[] | undefined}
   */
  select(selector) {
    
    if (typeof selector === "string") {

      return this.sprites[selector];
      
    }

    if (Array.isArray(selector)) {

      return selector.reduce((accum, spriteId) => {

        if (this.sprites[spriteId]) {

          accum.push(this.sprites[spriteId]);

        }

        return accum;

      }, []);

    }

  }

  /**
   * 
   * @param {Sprite} sprite 
   */
  addSprite(sprite) {

    this.sprites[sprite.id] = sprite;

  }

  /**
   * 
   * @param {string} spriteId
   */
  removeSprite(spriteId) {

    delete this.sprites[spriteId];
  }

  removeAllSprites() {
    
    Object.keys(this.sprites).forEach((spriteId) => {
    
      delete this.sprites[spriteId];
    
    });
  }

}