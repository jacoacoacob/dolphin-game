import { Sprite } from "./sprite.js";

function assetsPath(filename) {
  const { origin, pathname } = window.location;
  
  return origin + pathname + "assets/" + filename;
}

export class GameAssets {
  
  /** @type {Record<string, HTMLImageElement>} */
  images = {};

  /**
   * 
   * @param {Sprite} sprite 
   */
  getImage(sprite) {
    
    return this.images[sprite.imageName];

  }

  /**
   * 
   * @param {string} name 
   * @param {string} src 
   */
  loadImage(name, src) {

    return new Promise((resolve, reject) => {

      const image = new Image();

      image.src = assetsPath(src);

      console.log(image.src)

      image.onload = (_ev) => {

        this.images[name] = image;

        resolve(image);

      }

      image.onerror = function(_ev, source, line, col, error) {
        
        reject({ source, line, col, error });
      
      }

    });

  }

}
