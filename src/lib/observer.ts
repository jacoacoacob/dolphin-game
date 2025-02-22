
type Watcher = <Event>(event: Event) => void;

export class Subject {
  private watchers: Watcher[] = [];

  /**
   * Subscribe to events
   * @param watcher 
   */
  public watch(watcher: Watcher) {
    if (!this.watchers.includes(watcher)) {
      this.watchers.push(watcher);
    }
  }

  /**
   * Unsubscribe to events
   * @param watcher 
   */
  public unwatch(watcher: Watcher) {
    const targetIndex = this.watchers.indexOf(watcher);
    
    if (targetIndex > -1) {
      this.watchers.splice(targetIndex, 1);
    }
  }

  protected notify<Event>(event: Event) {
    for (let i = 0; i < this.watchers.length; i++) {
      this.watchers[i](event);
    }
  }
}
