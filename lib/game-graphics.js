import { Game } from "./game.js";

export class GameGraphics {

  constructor() {

    this.canvas = document.querySelector("canvas");

    this.ctx = this.canvas.getContext("2d");

  }

  /**
   * 
   * @param {Game} game 
   */
  paint(game) {

    this.ctx.clearRect(
      0,
      0,
      game.camera.viewport.width,
      game.camera.viewport.height
    );

    const visibleSprites = game.camera.visibleSprites(game);

    let spriteId;

    for (let i = 0; i < game.sprites.spriteIds.length; i++) {

      spriteId = game.sprites.spriteIds[i];

      game.sprites.sprites[spriteId].paint(game);

    }

  }

}