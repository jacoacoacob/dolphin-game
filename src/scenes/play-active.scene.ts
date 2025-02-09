import { overlaps } from "../lib/collision.js";
import type { Game } from "../lib/game.js";
import { Scene } from "../lib/scene.js";
import { RockSprite, DolphinSprite, SeaFloorSprite, BackdropSprite, DOLPHIN_SPRITE_ID } from "../sprites/index.js";

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
  async setup(game: Game) {

    await Promise.all([
      game.assets.loadImage("dolphin-sheet", await import("../assets/dolphin-baby/16bit-dolphin-baby-Sheet.png")),
      game.assets.loadImage("rock", await import("../assets/tiles/tiles-rock.png")),
      game.assets.loadImage("sand-coral", await import("../assets/tiles/tiles-sand-coral.png")),
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

    game.sprites.selectById(DOLPHIN_SPRITE_ID).dx = SPEED;

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

    const dolphinRect = {
      x: dolphin.x + 2,
      y: dolphin.y + 6,
      width: dolphin.width(game) / dolphin.spriteSheet.nFrames - 2,
      height: dolphin.height(game) - 12,
    };

    const didCollide = rocks.find(
      (rock) => overlaps(
        dolphinRect,
        { x: rock.x, y: rock.y, width: rock.width(game), height: rock.height(game) },
      )
    );

    game.graphics.paint(game);

    if (didCollide) {
      return "game_over";
    }

  }


  /**
   * 
   * @param {Game} game 
   */
  cleanup(game) {}

}
