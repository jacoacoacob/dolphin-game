import { Game } from "./game.js";

export class GameGraphics {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {

    const canvas = document.querySelector("canvas");

    if (!canvas) {
      this.canvas = document.createElement("canvas")
      document.append(this.canvas);
    } else {
      this.canvas = canvas;
    }

    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Couldn't create 2d rendering context");
    }

    this.ctx = ctx;

  }


  paint(game: Game) {

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