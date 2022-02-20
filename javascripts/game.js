import { Menu } from "./states/menu.js";
import { Play } from "./states/play.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
// ctx.strokeStyle
// mouseOut

canvas.focus();
ctx.imageSmoothingEnabled = true;

class Game {
  constructor() {
    this.states = { MENU: new Menu(), PLAY: new Play() };
    this.currentStateName = "MENU";
    this.state = this.states[this.currentStateName];

    this.events = {
      keys: {},
      mouse: { mouseDown: false, mouseCoords: { x: 0, y: 0 } },
    };
  }

  handleKeyBoard(event) {
    if (event.type === "keydown") {
      this.events.keys[event.key] = true;
    } else {
      this.events.keys[event.key] = false;
    }
  }

  handleMouse(event) {
    if (event.type === "mousemove") {
      this.events.mouse.mouseCoords.x = event.clientX - canvas.offsetLeft;
      this.events.mouse.mouseCoords.y = event.clientY - canvas.offsetTop;
    } else if (event.type === "mousedown") {
      this.events.mouse.mouseDown = true;
    } else {
      this.events.mouse.mouseDown = false;
    }
  }

  flipState() {
    this.currentStateName = this.state.nextState;
    this.states[this.currentStateName].startUp();
    this.state = this.states[this.currentStateName];
  }

  run() {
    if (this.state.done) {
      this.flipState();
    }

    this.state.update(this.events);
    this.state.draw();
    requestAnimationFrame(() => this.run());
  }
}

const _game = new Game();
canvas.addEventListener("keydown", (e) => _game.handleKeyBoard(e));
canvas.addEventListener("keyup", (e) => _game.handleKeyBoard(e));
//
canvas.addEventListener("mousedown", (e) => _game.handleMouse(e));
canvas.addEventListener("mouseup", (e) => _game.handleMouse(e));
canvas.addEventListener("mousemove", (e) => _game.handleMouse(e));
_game.run();
