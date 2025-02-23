import { describe, expect, it } from "vitest";
import { componentFactory } from "./entity.utils";

describe(componentFactory, () => {
  it("should return a function that returns a Component", () => {
    const createComponent = componentFactory("dimensions");
    const component = createComponent({ width: 20, height: 20 });
    
    expect(component).toHaveProperty("__kind", "dimensions");
    expect(component).toHaveProperty("data.width", 20);
    expect(component).toHaveProperty("data.height", 20);
  });
});