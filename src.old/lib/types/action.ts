
export interface Action<Name extends string, Payload> {
  name: Name;
  payload: Payload;
}
