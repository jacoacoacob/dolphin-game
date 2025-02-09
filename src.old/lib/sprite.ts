import { randId } from "./rand-id.js";
import type { SpriteSheet } from "./sprite-sheet.js";
import type { Game } from "./game.js";
import type { SpriteState } from "./types/sprite-state";
import { isUndefined } from "./utils.js";

interface SpriteOptions {
  /** a unique identifier for the sprite */
  id?: string;
  /**  use this to specify a category this sprite belings to (e.g. "star" or "coin") */
  kind: string;
  /** the name of the image in game.assets.images that represents this sprite */
  imageName?: string;
  /** the sprite's starting x position (in world coordinates) */
  x: number;
  /** the sprite's starting y position (in world coordinates) */
  y: number;
  /** the sprite's width (in world coordinates). If not defined, will default to width of image. */
  width?: number;
  /** the sprite's height (in world coordinates). If not defined, will default to height of image. */
  height?: number;
  spriteSheet?: SpriteSheet
}

export interface Sprite {
  dx: number;
  dy: number;
  y: number;
  x: number;
  id: string;
  kind: string;

  state?: string | undefined;
  states: Record<string, SpriteState<this>> | undefined;
  spriteSheet?: SpriteSheet;
  
  getWidth: (game?: Game) => number;
  getHeight: (game?: Game) => number;
}

export class BaseSprite implements Sprite {

  dx = 0;
  dy = 0;
  x = 0;
  y = 0;

  id: string;
  kind: string;

  state: string | undefined;
  states: Record<string, SpriteState<this>> | undefined;

  imageName?: string;
  spriteSheet?: SpriteSheet;

  private _width?: number;
  private _height?: number;

  constructor({
    id = randId(),
    kind,
    imageName,
    x = 0,
    y = 0,
    width,
    height,
    spriteSheet
  }: SpriteOptions) {
    this.id = id;
    this.kind = kind;
    this.imageName = imageName;
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
    this.spriteSheet = spriteSheet;
  }

  setState(game: Game, newState: string) {
    if (this.state && this.states) {
      const prevState = this.state;
      
      this.state = newState;
  
      if (this.states[prevState]) {
        this.states[prevState].leave(game, this);
      }
  
      this.states[this.state].enter(game, this);
    }
  }

  updatePosition(game: Game) {
    this.x += game.clock.throttle(this.dx);
    this.y += game.clock.throttle(this.dy);
  }

  getWidth(game?: Game) {
    if (typeof this._width === "number") {
      return this._width;
    }

    if (!isUndefined(game) && game.assets.images[this.imageName ?? ""]) {
      return game.assets.images[this.imageName ?? ""].width;
    }

    throw new Error("Unable to derive width");
  }


  getHeight(game?: Game) {
    if (typeof this._height === "number") {
      return this._height;
    }

    if (!isUndefined(game) && game.assets.images[this.imageName ?? ""]) {
      return game.assets.images[this.imageName ?? ""].height;
    }

    throw new Error("Unable to derive height");
  }
  
  paint(game: Game) {
    game.graphics.ctx?.drawImage(
      game.assets.getImage(this),
      this.x,
      this.y
    );
  }

}