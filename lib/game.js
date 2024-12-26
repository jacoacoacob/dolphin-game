import { GameClock } from "./game-clock.js";
import { GameControls } from "./game-controls.js";
import { GameScenes } from "./game-scenes.js";
import { GameSprites } from "./game-sprites.js";
import { Scene } from "./scene.js";

export class Game {

  constructor() {

    this.clock = new GameClock();

    this.controls = new GameControls();

    this.scenes = new GameScenes();

    this.sprites = new GameSprites();

    this.canvas = document.querySelector("canvas");

    this.ctx = this.canvas.getContext("2d");

    this._animationHandle = null;

  }

  /**
   * 
   * @param {Scene | string} scene 
   */
  setCurrentScene(scene) {
    
    if (scene instanceof Scene) {

      this.scenes.setCurrentScene(this, scene.name);

    }

    if (typeof scene === "string") {

      this.scenes.setCurrentScene(this, scene);

    }

  }

  update() {

    this.clock.tickTock();

    if (this.scenes.currentScene) {
      
      this.scenes.currentScene.update(this);

    }

  }

  loop() {

    this.update();

    this._animationHandle = window.requestAnimationFrame(this.loop.bind(this));

  }

}



