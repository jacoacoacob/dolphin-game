import { Action } from "./types";

// export interface Observer {
//   onNotify: <Entity, ActionName extends string, ActionPayload>(
//     entity: Entity,
//     action: Action<ActionName, ActionPayload>
//   ) => void;
// }

export type ObserverFn = ()

export class Subject {
  private observers: Observer[] = [];

  protected addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  protected removeObserver(observer: Observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  notify<Entity, ActionName extends string, ActionPayload>(
    entity: Entity,
    action: Action<ActionName, ActionPayload>
  ) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].onNotify(entity, action);
    }
  }
}