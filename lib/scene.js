
export class Scene {
  /**
   * 
   * @param {string} name 
   */
  constructor(name) {

    this.name = name;

  }

  /**
   * do things like loading assets, setting event listeners...
   * @param {CanvasRenderingContext2D} ctx
   */
  setup(ctx) {}

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  update(ctx) {}

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  cleanup(ctx) {}

}
