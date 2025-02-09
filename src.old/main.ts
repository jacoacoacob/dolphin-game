import { Game } from "./lib/game.js";
import { GameOverScene, PlayActiveScene } from "./scenes/index.js";

async function main() {
  
  const game = new Game();

  function onResize() {
    const maxViewportWidth = 600;

    const screenWidth = window.innerWidth;

    const viewportWidth = game.camera.viewport.width;
    if (game.graphics.canvas) {
      if (screenWidth < viewportWidth + 20) {
        game.graphics.canvas.width = game.camera.viewport.width = screenWidth - 20;
      } else if (
        screenWidth > viewportWidth + 20 &&
        screenWidth <= maxViewportWidth
      ) {
        game.graphics.canvas.width = game.camera.viewport.width = screenWidth - 20;
      }
    }
  }

  onResize();

  window.addEventListener("resize", onResize);
  window.addEventListener("selectstart", (ev) => {
    // this might fix issues with text selection side effects
    // of touch events on mobile devices
    ev.preventDefault();
  });
  
  const playActive = new PlayActiveScene();
  const gameOver = new GameOverScene();

  game.scenes.addScene(playActive);
  game.scenes.addScene(gameOver);
  
  await game.setCurrentScene(playActive);

  game.loop();
}  

main();