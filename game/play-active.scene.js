import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { DOLPHIN_SPRITE_ID, DolphinSprite } from "./dolphin.sprite.js";
import { PlayActiveSceneControls } from "./play-active.scene-controls.js";
import { RockSprite } from "./rock.sprite.js";

export class PlayActiveScene extends Scene {

  constructor() {

    super("play_active");

    this.controls = new PlayActiveSceneControls();

  }

  /**
   * 
   * @param {Game} game 
   */
  async setup(game) {

    await Promise.all([
      game.assets.loadImage("dolphin-sheet",  "../assets/dolphin-baby/16bit-dolphin-baby-Sheet.png"),
      game.assets.loadImage("dolphin-sheet",  "../assets/dolphin-baby/16bit-dolphin-baby-Sheet.png"),
      game.assets.loadImage("rock", "../assets/tiles/tiles-rock.png"),
    ]);

    game.sprites.addSprite(new RockSprite(96, 300 / 4));
    game.sprites.addSprite(new RockSprite(128, 300 / 4));
    game.sprites.addSprite(new RockSprite(160, 300 / 4));
    game.sprites.addSprite(new RockSprite(192, 300 / 4));
    game.sprites.addSprite(new RockSprite(192, 268 / 4));
    game.sprites.addSprite(new RockSprite(192, 236 / 4));
    game.sprites.addSprite(new RockSprite(192, 204 / 4));
    game.sprites.addSprite(new RockSprite(160, 204 / 4));
    game.sprites.addSprite(new RockSprite(128, 204 / 4));
    game.sprites.addSprite(new RockSprite(96, 204 / 4));
    game.sprites.addSprite(new RockSprite(96, 236 / 4));
    game.sprites.addSprite(new RockSprite(96, 268 / 4));

    game.sprites.addSprite(new DolphinSprite(130, 60));
    
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {



    if (this.controls.moveCameraUp(game)) {
      game.camera.dy = -0.5 * game.camera.scale;
    } else if (this.controls.moveCameraDown(game)) {
      game.camera.dy = 0.5 * game.camera.scale;
    } else {
      game.camera.dy = 0;
    }

    if (this.controls.moveCameraLeft(game)) {
      game.camera.dx = -0.5 * game.camera.scale;
    } else if (this.controls.moveCameraRight(game)) {
      game.camera.dx = 0.5 * game.camera.scale;
    } else {
      game.camera.dx = 0;
    }


    const dolphin = game.sprites.select(DOLPHIN_SPRITE_ID);

    if (this.controls.moveLeft(game)) {
      dolphin.dx = 0.5 * game.camera.scale;
    } else if (this.controls.moveRight(game)) {
      dolphin.dx = -0.5 * game.camera.scale;
    } else {
      dolphin.dx = 0;
    }

    if (this.controls.moveUp(game)) {
      dolphin.dy = 0.5 * game.camera.scale;
    } else if (this.controls.moveDown(game)) {
      dolphin.dy = -0.5 * game.camera.scale;
    } else {
      dolphin.dy = 0;
    }

    dolphin.update(game);
    game.camera.update(game);
  }


  /**
   * 
   * @param {Game} game 
   */
  cleanup(game) {

    game.sprites.removeSprite(DOLPHIN_SPRITE_ID);

  }

}
