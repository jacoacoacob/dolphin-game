import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { DOLPHIN_SPRITE_ID, DolphinSprite } from "./dolphin.sprite.js";
import { PlayActiveSceneControls } from "./play-active.scene-controls.js";
import { RockSprite } from "./rock.sprite.js";
import { SeaFloorSprite } from "./sea-floor.sprite.js";

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
      game.assets.loadImage("rock", "../assets/tiles/tiles-rock.png"),
      game.assets.loadImage("sand-coral", "../assets/tiles/tiles-sand-coral.png"),
    ]);

    Array.from(Array(50)).forEach((_, index) => {
      game.sprites.addSprite(new SeaFloorSprite(
        index * 100,
        124,
        100,
        10
      ));
    });

    game.sprites.addSprite(new RockSprite(210, 90, 10, 40))
    game.sprites.addSprite(new RockSprite(350, 90, 10, 40))
    game.sprites.addSprite(new RockSprite(490, 90, 10, 40))

    game.sprites.addSprite(new DolphinSprite(20, 100));

    const SPEED = 0.75;

    game.sprites.select("dolphin").dx = SPEED;

    game.camera.dx = -(SPEED * game.camera.scale);
    
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {
    const dolphin = game.sprites.select(DOLPHIN_SPRITE_ID);

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
