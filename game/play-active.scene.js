import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { DOLPHIN_SPRITE_ID, DolphinSprite } from "./dolphin.sprite.js";
import { RockSprite } from "./rock.sprite.js";

export class PlayActiveScene extends Scene {

  constructor() {

    super("play_active");

  }

  /**
   * 
   * @param {Game} game 
   */
  async setup(game) {
   
    game.camera.dx = 0.05;

    await Promise.all([
      game.assets.loadImage("dolphin-sheet",  "../assets/dolphin-baby/16bit-dolphin-baby-Sheet.png"),
      game.assets.loadImage("rock", "../assets/tiles/tiles-rock.png"),
    ]);

    game.sprites.addSprite(new RockSprite(40, 300));
    game.sprites.addSprite(new RockSprite(100, 300));
    game.sprites.addSprite(new RockSprite(160, 300));

    game.sprites.addSprite(new DolphinSprite());
    
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {

    game.camera.update(game);

    const dolphin = game.sprites.select(DOLPHIN_SPRITE_ID);

    dolphin.update(game);

  }


  /**
   * 
   * @param {Game} game 
   */
  cleanup(game) {

    game.sprites.removeSprite(DOLPHIN_SPRITE_ID);

  }

}
