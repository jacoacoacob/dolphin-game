import { Game } from "../../lib/game.js";
import { Sprite } from "../../lib/sprite.js";

export class BackdropSprite extends Sprite {
  
  /**
   * 
   * @param {Game} game 
   * @param {number} y 
   * @param {number} height 
   */
  constructor(game, y, height) {
    super({ id: "water", y, height });

    this.waterGradient = game.graphics.ctx.createLinearGradient(
      0,
      this.y,
      0,
      this.y + this.height(game)
    );

    this.waterGradient.addColorStop(0, "rgba(14, 222, 244, 0.91)");
    this.waterGradient.addColorStop(0.5, "rgba(14, 148, 244, 0.91)");
    this.waterGradient.addColorStop(1, "rgba(14, 110, 244, 0.87)");

    this.skyGradient = game.graphics.ctx.createLinearGradient(
      0,
      0,
      0,
      this.y
    );

    this.skyGradient.addColorStop(0, "rgba(205, 241, 253, 0.91)");
    this.skyGradient.addColorStop(1, "rgba(198, 244, 248, 0.91)");
  }

  /**
   * 
   * @param {Game} game 
   */
  paint(game) {

    game.graphics.ctx.fillStyle = this.waterGradient;
    game.graphics.ctx.fillRect(
      0,
      this.y,
      game.camera.viewport.width,
      this.height(game)
    );

    game.graphics.ctx.fillStyle = this.skyGradient;
    game.graphics.ctx.fillRect(
      0,
      0,
      game.camera.viewport.width,
      this.y
    );
  }

}
