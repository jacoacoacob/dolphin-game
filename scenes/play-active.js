import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";


export class PlayActive extends Scene {
  constructor() {
    super("play_active");
  }

  /**
   * 
   * @param {Game} game 
   */
  setup(game) {
    game.spawn("p1", {
      x: 20,
      y: 20,
      w: 40,
      h: 40,
    });

    game.canvas.width = 600;
    game.canvas.height = 400;
  }

  /**
   * 
   * @param {Game} game
   */
  update(game) {
    const p1 = game.entity("p1");
    p1.x += 0.1;
    p1.y += 0.1;

    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.beginPath();
    game.ctx.rect(
      p1.x,
      p1.y,
      p1.w,
      p1.h
    );
    game.ctx.strokeStyle = "green";
    game.ctx.stroke();
    game.ctx.closePath();
  }
}
