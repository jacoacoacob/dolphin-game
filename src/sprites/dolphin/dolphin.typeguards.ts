import { isObject } from "../../lib/utils";
import { DolphinSprite } from "../dolphin.sprite";

export function isDolphin(data: unknown): data is DolphinSprite {
  return isObject(data) && data.constructor === DolphinSprite;
}
