import { overlaps } from "./collision.js";
import { Game } from "./game.js";
import { Sprite } from "./sprite.js";

import { createScaleMatrix, multiplyMatrixAndPoint, createPoint, createOrthographicProjectionMatrix, multiplyMatrices, createTranslationMatrix } from "../lib/matrix.js";


export class GameCamera {

  /**
   * The x position (in world coordinates) of the upper left corner of the camera viewport
   */
  originX = 0;

  /**
   * The y position (in world coordinates) of the upper left corner of the camera viewport
   */
  originY = 0

  dx = 0;

  dy = 0;

  
  constructor(initialScale = 1, viewportWidth = 600, viewportHeight = 400) {
    
    this.viewport = {
      height: viewportHeight,
      width: viewportWidth,
    };
    
    /**
     * used to create a scale transformation matrix. don't set this directly.
     * use {@link GameCamera.zoom} instead
     */
    this.scale = initialScale;

    this.scaleMatrix = createScaleMatrix(this.scale);

  }

  computeScaleMatrix() {

    this.scaleMatrix = createScaleMatrix(this.scale);

  }

  /**
   * make sprite coordinates 
   * 
   * @param {number} value 
   */
  zoom(value) {

    this.scale = value;

    this.computeScaleMatrix();

  }

  /**
   * 
   * @param {Game} game 
   * @returns {Sprite[]} an array of sprites that should be rendered by the camera 
   */
  visibleSprites(game) {

    const viewport = {
      x: this.originX,
      y: this.originY,
      width: this.viewport.width,
      height: this.viewport.height,
    };

    const result = [];

    let spriteId;

    let sprite;

    // This method will be called on every frame of the  game loop so it
    // needs to be fast and light. Using a for loop here because I have a
    // vague impression that this is more generally performant than using
    // Array.filter or Array.reduce...it bears looking  into
    for (let i = 0; i < game.sprites.spriteIds.length; i++) {
      
      spriteId = game.sprites.spriteIds[i];

      sprite = game.sprites.select(spriteId) ?? {};

      if (overlaps(sprite, viewport)) {

        result.push(sprite);

      }

    }

    return result;

  }

  /**
   * transform a rectangle from world coordinates to camera coordinates
   * 
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  transform(x, y, width, height) {

    const matrix = multiplyMatrices(
      createTranslationMatrix(x, y),
      this.scaleMatrix,
    );

    const left = multiplyMatrixAndPoint(matrix, createPoint(x, y));
      
    const right = multiplyMatrixAndPoint(
      matrix,
      createPoint(x + width, y + height)
    );

    return {
      x: left[0],
      y: left[1],
      width: right[0] - left[0],
      height: right[1] - left[1],
    };

  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {

    this.originX += this.dx;

    this.originY += this.dy;

  }

}