
export class GameTextReadout {

  constructor(selector) {
    this.elem = document.querySelector(selector);
  }

  write(text) {
    this.elem.textContent = text;
  }

  writeLine(text) {
    this.elem.textContent += `\n${text}`;
  }

}