import { Game } from "./game.js";
import { Scene } from "./scene.js";

export class GameScenes {
  
  constructor() {
    
    /**
     * a dictionary of scenes indexed by scene `name`
     */
    this._scenes = {};

    /**
     * The name of the current scene. Don't set this directly. Use
     * {@link Game.setCurrentScene} instead
     */
    this._currentScene = "";
  
  }

  /**
   * 
   * @returns {Scene | undefined}
   */
  get currentScene() {

    return this._scenes[this._currentScene];

  }

  /**
   * Sets the current scene and does the appropriate setup and cleanup
   * 
   * This should only be called internally. Most users should call {@link Game.setCurrentScene} instead
   * 
   * @param {Game} game
   * @param {string} sceneName 
   */
  async setCurrentScene(game, sceneName) {

    if (this.currentScene) {
      
      this.currentScene.cleanup(game);

    }

    this._currentScene = sceneName;

    if (this.currentScene) {

      await this.currentScene.setup(game);

    }

  }

  /**
   * register a scene 
   * @param {Scene} scene 
   */
  addScene(scene) {

    this._scenes[scene.name] = scene;

  }


}
