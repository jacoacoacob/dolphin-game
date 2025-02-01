import { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { DOLPHIN_SPRITE_ID, DolphinSprite } from "./dolphin.sprite.js";
import { RockSprite } from "./rock.sprite.js";
import { SeaFloorSprite } from "./sea-floor.sprite.js";
import { BackdropSprite } from "./backdrop.sprite.js";

const ROCKS = [
  0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,2,0,1,2,1,0,1,
  0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,2,0,1,2,1,0,1,
  0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,2,0,1,2,1,0,1
];
  
export class PlayActiveScene extends Scene {

  constructor() {
    super("play_active");
  }

  /**
   * 
   * @param {Game} game 
   */
  async setup(game) {

    await Promise.all([
      game.assets.loadImage("dolphin-sheet",  "dolphin-baby/16bit-dolphin-baby-Sheet.png"),
      game.assets.loadImage("rock", "tiles/tiles-rock.png"),
      game.assets.loadImage("sand-coral", "tiles/tiles-sand-coral.png"),
    ]);

    game.sprites.addSprite(new BackdropSprite(game, 300, 100));

    Array.from(Array(ROCKS.length)).forEach((_, index) => {
      game.sprites.addSprite(new SeaFloorSprite(
        index * 140,
        124,
        140, 
        10
      ));
    });
  
    ROCKS.forEach((value, index) => {
      
      if (value === 1) {
        game.sprites.addSprite(new RockSprite(index * 140, 90, 10, 40));
      }

      if (value === 2) {
        game.sprites.addSprite(new RockSprite(index * 140, 90, 10, 40));
        game.sprites.addSprite(new RockSprite(index * 140 + 20, 90, 10, 40));
      }

    });

    game.sprites.addSprite(new DolphinSprite(20, 100));

    const SPEED = 2;

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
