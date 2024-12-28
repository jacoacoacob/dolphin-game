import { Game } from "../lib/game.js";
import { PlayActiveScene } from "./play-active.scene.js";

async function main() {
  
  const playActive = new PlayActiveScene();
  
  const game = new Game();
  
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
