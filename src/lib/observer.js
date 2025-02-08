import { Sprite } from "./sprite.js";

/**
 * @typedef Action
 * @property {string} type
 * @property {any} payload
 */



export class Observer {
  /**
   * 
   * @param {Sprite} sprite 
   * @param {Action} action 
   */
  onNotify(sprite, action) {}
}