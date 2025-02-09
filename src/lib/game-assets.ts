import { Sprite } from "./sprite.js";



export class GameAssets {
  
  images: Record<string, HTMLImageElement> = {};

  getImage(sprite: Sprite) {
    return this.images[sprite.imageName ?? ""];
  }

  async loadImage(name: string, src: { default: string }) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = src.default;

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
