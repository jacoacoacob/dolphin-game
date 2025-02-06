import { overlaps } from "../../lib/collision.js";
import { Game } from "../../lib/game.js";
import { Scene } from "../../lib/scene.js";
import { RockSprite, DolphinSprite, SeaFloorSprite, BackdropSprite, DOLPHIN_SPRITE_ID } from "../sprite/index.js";

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

    game.sprites.removeAllSprites();
    game.camera.originX = 0;

    game.sprites.addSprite(new BackdropSprite(game, 300, 100));

    Array.from(Array(ROCKS.length)).forEach((_, index) => {
      game.sprites.addSprite(new SeaFloorSprite(
        index * 100,
        124,
        100, 
        10
      ));
    });
  
    ROCKS.forEach((value, index) => {
      
      if (value === 1) {
        game.sprites.addSprite(new RockSprite(index * 100, 90, 10, 40));
      }

      if (value === 2) {
        game.sprites.addSprite(new RockSprite(index * 100, 90, 10, 40));
        game.sprites.addSprite(new RockSprite(index * 100 + 20, 90, 10, 40));
      }

    });

    game.sprites.addSprite(new DolphinSprite(20, 100));

    const SPEED = 1;

    game.sprites.selectById("dolphin").dx = SPEED;

    game.camera.dx = -(SPEED * game.camera.scale);
    
  }

  /**
   * 
   * @param {Game} game 
   */
  update(game) {
    /**
     * @type {DolphinSprite}
     */
    const dolphin = game.sprites.selectById(DOLPHIN_SPRITE_ID);

    dolphin.update(game);
    game.camera.update(game);

    const rocks = game.sprites.selectByKind("rock");

    const didCollide = rocks.find(
      (rock) => overlaps(
        { x: dolphin.x, y: dolphin.y, width: dolphin.width(game) / dolphin.spriteSheet.nFrames, height: dolphin.height(game) },
        { x: rock.x, y: rock.y, width: rock.width(game), height: rock.height(game) },
      )
    );

    if (didCollide) {
      return "game_over";
    }

    game.graphics.paint(game);
  }


  /**
   * 
   * @param {Game} game 
   */
  cleanup(game) {}

}
