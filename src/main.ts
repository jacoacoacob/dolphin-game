import { entityFactory } from "./lib/entity";

const createRect = entityFactory({
  kind: "rect",
  components: ["dimensions", "position", "velocity"],
});

const rect = createRect({
  dimensions: {
    width: 32,
    height: 32,
  },
  position: {
    x: 2,
    y: 93,
  },
  velocity: {
    dx:8,
    dy:9,
  }
});


log(rect);

function log(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}

