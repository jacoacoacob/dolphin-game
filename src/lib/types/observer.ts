import type { Sprite } from "../sprite.js";
import type { Action } from "./action";

export interface Observer {
  onNotify: <Name extends string, Payload>(sprite: Sprite, action: Action<Name, Payload>) => void;
}
