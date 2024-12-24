
export class Sprite {

  /**
   * 
   * @param {string} id 
   * @param {number} zIndex 
   */
  constructor(id, zIndex = 0) {

    this.id = id;

    this.zIndex = zIndex;

  }

  /**
   * define paint to control how your sprite is painted
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  paint(ctx) {

    console.warn("[Sprite::paint] unimplemented");

  }

}
