export class GameInput {

  constructor() {

    /**
     * @type {Record<string, ((event) => void)[]>}
     */
    this._listeners = {};

  }

  on(eventType, listener) {

    if (!Array.isArray(this._listeners[eventType])) {

      this._listeners[eventType] = [];

    }

    this._listeners[eventType].push(listener);

  }

  off(eventType, listener) {

    if (Array.isArray(this._listeners[eventType])) {

      this._listeners[eventType] = this._listeners[eventType].filter(
        
        (_listener) => _listener !== listener

      );

    }

  }

}