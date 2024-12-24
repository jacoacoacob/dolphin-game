import { Scene } from "./scene.js";
import { Sprite } from "./sprite.js";

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

    this.canvas = document.querySelector("canvas");

    this.ctx = this.canvas.getContext("2d");

    this._animationHandle = null;

    /**
     * @type {Record<Sprite["id"], Sprite>}
     */
    this._sprites = {};

    /**
     * @type {string[]}
     */
    this._spriteIds = [];

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
   * @param {string} id
   */
  sprite(id) {

    return this._sprites[id];

  }

  /**
   * 
   * @param {string} name 
   * @param {any} data 
   */
  spawn(name, data) {

    this._entities[name] = data;

  }

  /**
   * 
   * @param {string} name 
   */
  deSpawn(name) {

    delete this._entities[name];

  }

  /**
   * 
   * @param {string} name the name of the scene
   */
  setScene(name) {

    if (this._scenes[this._currentScene]) {

      this._scenes[this._currentScene].cleanup();

    }

    this._currentScene = name;

    this._scenes[this._currentScene].setup(this);

  }

  update() {

    this._scenes[this._currentScene].update(this);

  }

  loop() {

    this.update();

    this._animationHandle = window.requestAnimationFrame(this.loop.bind(this));

  }

  cancelLoop() {

    window.cancelAnimationFrame(this._animationHandle);

  }
}



