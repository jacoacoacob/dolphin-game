import { Sprite } from "./sprite.js";

export class GameSprites {
  
  constructor() {

    this.sprites = {};
    
    this.spriteIds = [];

  }

  /**
   * 
   * @param {string} spriteId
   * @returns {Sprite | undefined}
   */
  selectById(spriteId) {

    return this.sprites[spriteId];

  }

  /**
   * 
   * @param {string} spriteKind
   * @returns {Sprite[]}
   */
  selectByKind(spriteKind) {
    
    const sprites = [];

    for (let i = 0; i < this.spriteIds.length; i++) {

      const sprite = this.sprites[this.spriteIds[i]];
      
      if (sprite && sprite.kind === spriteKind) {

        sprites.push(sprite);

      }

    }

    return sprites;

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