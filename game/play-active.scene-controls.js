import { Game } from "../lib/game.js";

export class PlayActiveSceneControls {

  /**
   * 
   * @param {Game} game 
   */
  moveUp(game) {
    return game.inputs.arrowUp.isPressed && !game.inputs.arrowDown.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveDown(game) {
    return game.inputs.arrowDown.isPressed && !game.inputs.arrowUp.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveLeft(game) {
    return game.inputs.arrowLeft.isPressed && !game.inputs.arrowRight.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveRight(game) {
    return game.inputs.arrowRight.isPressed && !game.inputs.arrowLeft.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveCameraRight(game) {
    return game.inputs.d.isPressed && !game.inputs.a.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveCameraLeft(game) {
    return game.inputs.a.isPressed && !game.inputs.d.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveCameraUp(game) {
    return game.inputs.w.isPressed && !game.inputs.s.isPressed;
  }

  /**
   * 
   * @param {Game} game 
   */
  moveCameraDown(game) {
    return game.inputs.s.isPressed && !game.inputs.w.isPressed;
  }

}