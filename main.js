import { Game } from "./lib/game.js";
import { Scene } from "./lib/scene.js";

/** @type {HTMLButtonElement} */
const stopStart = document.getElementById("stop-start");

stopStart.textContent = "Start";
stopStart.addEventListener("click", () => {
  if (stopStart.textContent === "Start") {
    stopStart.textContent = "Stop";
  }
})

let animationHandle = null;

function start(game) {
  animationHandle = window.requestAnimationFrame(game);
}

function stop() {
  window.cancelAnimationFrame(animationHandle);
}


function game() {

}


