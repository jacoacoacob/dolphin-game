import { Sprite } from "./sprite.js";

export class GameSprites {
  
  constructor() {

    this.sprites = {};
    
    this.spriteIds = [];

  }

  /**
   * 
   * @param {string} spriteId a spriteId
   * @returns {Sprite | undefined}
   */
  select(spriteId) {

    return this.sprites[spriteId];

  }

  /**
   * 
   * @param {string[]} spriteIds an array of spriteIds
   * @returns {Sprite[]}
   */
  selectAll(spriteIds) {

    return spriteIds.reduce((accum, spriteId) => {

      if (this.sprites[spriteId]) {

        accum.push(this.sprites[spriteId]);

      }

      return accum;

    }, []);

  }

  /**
   * 
   * @param {Sprite} sprite 
   */
  addSprite(sprite) {

    this.sprites[sprite.id] = sprite;

    this.computeSpriteIds();

  }

  /**
   * 
   * @param {string} spriteId
   */
  removeSprite(spriteId) {

    delete this.sprites[spriteId];

    this.computeSpriteIds();

  }

  removeAllSprites() {
    
    Object.keys(this.sprites).forEach((spriteId) => {
    
      delete this.sprites[spriteId];
    
    });

    this.computeSpriteIds();

  }


  /**
   * Compute an array of sprite IDs for all currently registered sprites
   */
  computeSpriteIds() {

    this.spriteIds = Object.keys(this.sprites);

  }

}