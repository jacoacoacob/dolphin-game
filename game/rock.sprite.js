import { Sprite } from "../lib/sprite.js";

export class RockSprite extends Sprite {

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {

    super({
      kind: "rock",
      imageName: "rock",
      x,
      y,
      zIndex: 20,
      isCollidable: true,
      isMovable: false,
    });

  }

}
