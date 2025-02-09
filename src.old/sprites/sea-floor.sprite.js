import { Game } from "../lib/game.js";
import { Sprite } from "../lib/sprite.js";

export class SeaFloorSprite extends Sprite {

  constructor(x, y, width, height) {
    super({
      kind: "sea-floor",
      imageName: "sand-coral",
      x,
      y,
      width,
      height,
    });
  }
  
  /**
   * 
   * @param {Game} game 
   */
  paint(game) {

    const { x, y, width, height } = game.camera.transform(
      this.x,
      this.y,
      this.width(game),
      this.height(game)
    );

    const image = game.assets.getImage(this);

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
