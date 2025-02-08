import { Game } from './game.js';

export class Scene {
  /**
   * 
   * @param {string} name 
   */
  constructor(name) {

    this.name = name;

  }

  /**
   * *optional*
   * 
   * called only once at the beginning of the Scene lifetime.
   * Use `setup` to spawn entities; do other setup work.
   * 
   * @param {Game} game
   */
  async setup(game) {}

  /**
   * called every iteration of the game loop.
   * 
   * handle and dispatch events; paint the scene
   * @param {Game} game
   * @returns {string | undefined}
   */
  update(game) {}

  /**
   * *optional*
   * 
   * despawn entities; remove key mappings revent listeners
   * 
   * @param {Game} game
   */
  cleanup(game) {}

}
