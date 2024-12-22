import { Scene } from "./scene.js";

export class Game {

  constructor() {
    /**
     * @type {Record<Scene["name"], Scene>}
     */
    this._scenes = {};
    /**
     * @type {string}
     */
    this._currentScene = "";

    this._canvas = document.querySelector("canvas");

    this._ctx = this._canvas.getContext("2d");
  }

  /**
   * 
   * @param {Scene} scene 
   */
  addScene(scene) {

    this._scenes[scene.name] = scene;

  }

  /**
   * 
   * @param {keyof ThisType._scenes} name the name of the scene
   */
  setScene(name) {

    if (this._scenes[this._currentScene]) {

      this._scenes[this._currentScene].cleanup();

    }

    this._currentScene = name;

    this._scenes[this._currentScene].setup();

  }

  update() {


    this._scenes[this._currentScene].update(this._ctx);

  }
}



