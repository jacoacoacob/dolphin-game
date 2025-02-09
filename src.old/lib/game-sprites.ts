import { Sprite } from "./sprite.js";

export class GameSprites {

  sprites: Record<string, Sprite> = {};

  spriteIds: string[] = [];

  selectById(spriteId: string): Sprite | undefined {
    return this.sprites[spriteId];
  }

  selectByKind(spriteKind: string): Sprite[] {
    const sprites = [];

    for (let i = 0; i < this.spriteIds.length; i++) {
      const sprite = this.sprites[this.spriteIds[i]];
      
      if (sprite && sprite.kind === spriteKind) {
        sprites.push(sprite);
      }
    }

    return sprites;
  }

  addSprite<S extends Sprite>(sprite: S) {

    this.sprites[sprite.id] = sprite;

    this.computeSpriteIds();

  }

  removeSprite(spriteId: string) {
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