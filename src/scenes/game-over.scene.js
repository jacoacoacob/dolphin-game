import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";

export class GameOverScene extends Scene {
  constructor() {
    super("game_over");
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {
    console.log("Gameiver update")
    game.graphics.ctx.strokeStyle = "blue";
    game.graphics.ctx.font = "20px monospace";
    game.graphics.ctx.strokeText(
      "G A M E  O V E R",
      game.camera.viewport.width / 2 - 100,
      game.camera.viewport.height / 2 - 20,
    );
    game.graphics.ctx.font = "16px monospace";
    game.graphics.ctx.strokeText(
      "tap or press space to start again",
      game.camera.viewport.width / 2 - 170,
      game.camera.viewport.height / 2 + 40,
    );

    if (game.inputs.spacebar.isPressed || game.inputs.touch.isPressed) {
      return "play_active"
    }
  }
}