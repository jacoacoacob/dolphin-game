export type Component<Kind extends string, Data> = {
  __kind: Kind;
  data: Data;
}

export type Entity<Comp extends Component<string, unknown>> = {
  [C in Comp as C["__kind"]]: Extract<Comp, { __kind: C["__kind"] }>;
}

export type Position = Component<"position", {
  x: number;
  y: number;
}>;

export type Dimensions = Component<"dimensions", {
  width: number;
  height: number;
}>;

export type KnownComponent = Position | Dimensions;
