import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";

import { DolphinSprite } from "./dolphin.sprite.js";

const game = new Game();


class StartScreen extends Scene {
  constructor() {
    super("start_screen");
  }

  /**
   * 
   * @param {Game} game 
   */
  setup(game) {
    game.sprites.addSprite(new DolphinSprite())
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {

  }
}

const startScreen = new StartScreen();

game.scenes.addScene(startScreen);

game.setCurrentScene(startScreen);

game.loop();



// import { setupGame } from "./monolith.js";

// async function main() {
//   const game = await setupGame();

//   game.loop();
// }

// main();
