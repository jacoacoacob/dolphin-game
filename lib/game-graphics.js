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

    // const visibleSprites = game.camera.visibleSprites(game);

    for (let i = 0; i < game.sprites.spriteIds.length; i++) {

      game.sprites.sprites[game.sprites.spriteIds[i]].paint(game);

    }

  }

}