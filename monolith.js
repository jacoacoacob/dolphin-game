const candace = document.querySelector("canvas");
const ctx = candace.getContext("2d");

const tiles = [0,0,0,1,0,2,0,0,1,0,0,1,0,1,0,2,1];
const tileWidth = 300;
const obstacleWidth = 30;

const game = {
  viewport: {
    width: 600,
    height: 400,
  },
  world: {
    width: tiles.length * tileWidth,
    height: 400,    
  },
};

candace.width = game.viewport.width;
candace.height = game.viewport.height;

/** @type {HTMLImageElement} */
let dolphin = null;

let cameraOrigin = 0;


async function useDolphin() {
  dolphin = await loadImage("./assets/dolphin-baby/16bit-dolphin-baby-Sheet.png");

  const dolphinX = 50;

  let dolphinY = game.viewport.height - 100;

  const cameraFramesPerDolphineFrame = 4;
  let cameraFrameCount = 0;
  let currentFrame = 0;
  
  return {
    updateFrame() {
      if (cameraFrameCount === cameraFramesPerDolphineFrame) {
        if (currentFrame < 3) {
          currentFrame += 1;
        } else {
          currentFrame = 0;
        }
        console.log(currentFrame)

        cameraFrameCount = 0;
      } else {
        cameraFrameCount += 1;
      }
    },
    paint() {
      const sourceX = dolphin.width / 4 * currentFrame - 1;
      const sourceY = 0;
      const sourceWidth = dolphin.width / 4;
      const sourceHeight = dolphin.height;
      const destX = dolphinX;
      const destY = dolphinY;
      const destWidth = sourceWidth * 4;
      const destHeight = sourceHeight * 4;
      
      ctx.drawImage(
        dolphin,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );
    }
  }
}

const obstacles = tiles.reduce((accum, tile, index) => {
  if (tile > 0) {
    const width = tile * obstacleWidth;
    accum.push({
      /**
       * x position relative to the whole world (not just the camera viewport)
       */
      worldX: index * tileWidth + tileWidth / 2 - width / 2,
      width,
    });
  }
  return accum;
}, []);


function camera() {
  const x1 = cameraOrigin;
  const x2 = cameraOrigin + game.viewport.width;

  const inViewObstacles = obstacles.filter(
    (obstacle) =>
      obstacle.worldX + obstacle.width >= x1 &&
      obstacle.worldX <= x2
  );

  ctx.clearRect(
    0,
    0,
    game.viewport.width,
    game.viewport.height
  );

  for (let i = 0; i < inViewObstacles.length; i++) {
    const obstacle = inViewObstacles[i];
    const cameraX = obstacle.worldX - cameraOrigin;

    ctx.fillRect(
      cameraX,
      300,
      obstacle.width,
      100
    );
  }
}

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = path;
    image.onload = function(_ev) {
      resolve(image);
    };
    image.onerror = function(_ev, source, line, col, error) {
      reject({
        source,
        line,
        col,
        error
      });
    }
  });
}

export async function setupGame() {
  const { updateFrame, paint } = await useDolphin();
  
  function loop() {
    camera();
    paint();
    updateFrame();

    cameraOrigin += 8;
    window.requestAnimationFrame(loop);
  }

  return { loop };
}
