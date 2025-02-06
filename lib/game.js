import { GameAssets } from "./game-assets.js";
import { GameCamera } from "./game-camera.js";
import { GameClock } from "./game-clock.js";
import { GameInputs } from "./game-input.js";
import { GameGraphics } from "./game-graphics.js";
import { GameScenes } from "./game-scenes.js";
import { GameSprites } from "./game-sprites.js";
import { Scene } from "./scene.js";
import { GameTextReadout } from "./game-log.js";

export class Game {

  assets = new GameAssets();

  camera = new GameCamera(3);

  clock = new GameClock();

  inputs = new GameInputs();

  graphics = new GameGraphics();

  scenes = new GameScenes();

  sprites = new GameSprites();

  readout = new GameTextReadout(".log");

  _animationHandle = null;

  constructor() {

    this.graphics.canvas.width = this.camera.viewport.width;

    this.graphics.canvas.height = this.camera.viewport.height;

  }

  /**
   * 
   * @param {Scene | string} scene 
   */
  async setCurrentScene(scene) {
    
    if (scene instanceof Scene) {

      await this.scenes.setCurrentScene(this, scene.name);

    }

    if (typeof scene === "string") {

      await this.scenes.setCurrentScene(this, scene);

    }

  }

  update() {

    this.clock.tickTock();

    if (this.scenes.currentScene) {
      
      const nextScene = this.scenes.currentScene.update(this);

      if (nextScene) {
       
        this.scenes.setCurrentScene(this, nextScene);
      
      }

    }

  }

  loop() {

    this.update();

    this._animationHandle = window.requestAnimationFrame(this.loop.bind(this));

  }

}



