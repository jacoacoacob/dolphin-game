import { entityFactory } from "./lib/entity";

const createRect = entityFactory({
  kind: "rect",
  components: ["dimensions", "position"],
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
});

console.log(JSON.stringify(rect, null, 2));
