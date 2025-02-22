import type { Component, Entity, KnownComponent } from "./entity.types";

export function componentFactory<
  Kind extends KnownComponent["__kind"],
  Data extends Extract<KnownComponent, { __kind: Kind }>["data"]
>(kind: Kind) {
  return (data: Component<Kind, Data>["data"]): Component<Kind, Data> => ({
    __kind: kind,
    data
  });
}

type ComponentFactories<Kind extends KnownComponent["__kind"]> = {
  [K in Kind]: typeof componentFactory;
}

type EntityParams<Kind extends KnownComponent["__kind"]> = {
  [K in Kind]: Extract<KnownComponent, { __kind: K }>["data"];
}

export function createEntity<Kind extends KnownComponent["__kind"]>(
  components: Kind[],
  factories: ComponentFactories<Kind>,
  params: EntityParams<Kind>
) {
  return Object.fromEntries(
    components.map((kind) => [
      kind,
      (factories[kind] as (args: unknown) => unknown)(params[kind])
    ])
  ) as Entity<Extract<KnownComponent, { __kind: Kind }>> 
}

export function entityFactory<Kind extends KnownComponent["__kind"]>(
  ...components: Kind[]
) {
  const factories = Object.fromEntries(
    components.map((kind) => [
      kind,
      componentFactory(kind)
    ])
  ) as unknown as ComponentFactories<Kind>;

  return (params: EntityParams<Kind>) => createEntity(components, factories, params)
}
