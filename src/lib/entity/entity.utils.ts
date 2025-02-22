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

type EntityParams<ComponentKind extends KnownComponent["__kind"]> = {
  [K in ComponentKind]: Extract<KnownComponent, { __kind: K }>["data"];
}

export function createEntityComponents<Kind extends KnownComponent["__kind"]>(
  componentKinds: Kind[],
  componentFactories: ComponentFactories<Kind>,
  params: EntityParams<Kind>
) {
  return Object.fromEntries(
    componentKinds.map((kind) => [
      kind,
      (componentFactories[kind] as (args: unknown) => unknown)(params[kind])
    ])
  ) as { [K in Kind]: Extract<KnownComponent, { __kind: Kind }> }
}

interface EntityFactoryParams<
  Kind extends string,
  ComponentKind extends KnownComponent["__kind"]
> {
  kind: Kind;
  components: ComponentKind[];
}

export function entityFactory<
  EntityKind extends string,
  ComponentKind extends KnownComponent["__kind"]
>({
  components,
  kind,
}: EntityFactoryParams<EntityKind, ComponentKind>) {
  const factories = Object.fromEntries(
    components.map((kind) => [
      kind,
      componentFactory(kind)
    ])
  ) as unknown as ComponentFactories<ComponentKind>;

  type Result = Entity<
    EntityKind,
    Extract<KnownComponent, { __kind: ComponentKind }>
  >;

  return (params: EntityParams<ComponentKind>) => ({
    meta: {
      __kind: kind,
    },
    components: createEntityComponents(components, factories, params)
  } as unknown as Result)
}
