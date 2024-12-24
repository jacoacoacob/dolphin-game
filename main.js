// import { Game } from "./lib/game.js";

// import { PlayActive } from "./scenes/play-active.js";

import { setupGame } from "./monolith.js";

async function main() {
  const game = await setupGame();

  game.loop();
}

main();


// const game = new Game();

// game.addScene(new PlayActive());
// game.setScene("play_active");

// setupStartStopButton();


// function setupStartStopButton() {
//   /** @type {HTMLButtonElement} */
//   const stopStart = document.getElementById("stop-start");

//   stopStart.textContent = "Start";
//   stopStart.addEventListener("click", () => {
//     console.log(stopStart.textContent)
//     if (stopStart.textContent === "Start") {
//       stopStart.textContent = "Stop";
//       game.loop();
//     } else {
//       stopStart.textContent = "Start";
//       game.cancelLoop();
//     }
//   });
// }

