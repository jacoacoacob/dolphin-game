import type { Sprite } from "../sprite.js";
import type { Action } from "./action";

export interface Observer {
  onNotify: <Name extends string, Payload>(sprite: Sprite, action: Action<Name, Payload>) => void;
}

export interface Subject {
  observers: Observer[];
  addObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notify: <S extends Sprite, Name extends string, Payload>(
    s: S,
    action: Action<Name, Payload>
  ) => void;
}
