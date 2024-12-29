import { Game } from "../lib/game.js";
import { PlayActiveScene } from "./play-active.scene.js";

async function main() {
  
  const game = new Game();
  
  const playActive = new PlayActiveScene();

  game.scenes.addScene(playActive);
  
  await game.setCurrentScene(playActive);

  game.loop();
}  

main();

// import { setupGame } from "../monolith.js";

// async function main() {
//   const game = await setupGame();

//   game.loop();
// }

// main();
