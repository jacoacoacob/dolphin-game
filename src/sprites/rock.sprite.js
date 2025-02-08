import { Game } from "../lib/game.js";
import { Sprite } from "../lib/sprite.js";

export class RockSprite extends Sprite {

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {

    super({
      kind: "rock",
      imageName: "rock",
      x,
      y,
      width,
      height,
      zIndex: 20,
      isCollidable: true,
      isMovable: false,
    });

  }

  /**
   * 
   * @param {Game} game 
   */
  paint(game) {

    const image = game.assets.getImage(this);

    const { x, y, width, height } = game.camera.transform(
      this.x,
      this.y,
      this.width(game),
      this.height(game),
    );

    game.graphics.ctx.drawImage(
      // the image to draw
      image,
      // the x coordinate of the left-most *part of the image* we want to render (in image coordinates)
      0,
      // the y coordinate of the top-most *part of the image* we want to render (in image coordinates)
      0,
      // the width of the area of the *part of the image* we want to render
      image.width,
      // the height of the area of the *part of the image* we want to render
      image.height,
      // the x coordinate in viewport coordinates 
      x,
      // the y corrdinate in viewport coordinates
      y,
      // the width of the image actually rendered on the screen
      width,
      // the height of the image actually rendered on the screen
      height  
    );

  }

}
