
export class GameClock {

  currentTime = Date.now();
  previousTime = Date.now();
  delta = this.currentTime - this.previousTime;

  tickTock() {
    this.previousTime = this.currentTime;
    this.currentTime = Date.now();
    this.delta = this.currentTime - this.previousTime;
  }

}
