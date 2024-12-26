import { Sprite } from "./sprite.js";

export class Camera {

  constructor() {

    this.originX = 0;

    this.originY = 0;

    this.viewport = {
      height: 400,
      width: 600,
    };

  }

  /**
   * translate sprite world coordinates to viewport coordinates
   * 
   * @param {Sprite} sprite
   */
  translate(sprite) {



  }

  /**
   * 
   * @param {number} originX 
   * @param {number} originY 
   */
  move(originX, originY) {
    
    this.originX = originX;

    this.originY = originY;
    
  }

}