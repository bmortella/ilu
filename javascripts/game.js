import { Player } from "./models/player.js";
import { Projectile } from "./models/projectile.js";
import { Asteroid } from "./models/asteroid/asteroid.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

class InGame {
  constructor() {
    this.mousePos = { x: 0, y: 0 };

    this.player = new Player(canvas.width / 2, canvas.height - 200);

    this.projectiles = [];
    this.projectileCooldown = -30; // frames
    this.projectileCooldownCount = 0;

    // this.asteroidDesigner = new AsteroidDesigner(
    //   { x: canvas.width / 2, y: 300 },
    //   "normal"
    // );
    this.asteroid = new Asteroid({ x: 200, y: 200 }, 10);
  }

  update(events) {
    this.player.update(events);

    // this.asteroidDesigner.update(events);

    this.mousePos.x = events.mouse.mouseCoords.x;
    this.mousePos.y = events.mouse.mouseCoords.y;

    // Update projectiles
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
      if (
        projectile.x > canvas.width ||
        projectile.x < 0 ||
        projectile.y > canvas.height ||
        projectile.y < 0
      ) {
        this.projectiles.splice(index, 1);
      }
    });

    if (events.mouse.mouseDown) {
      if (this.projectileCooldownCount >= 0) {
        this.projectiles.push(new Projectile(this.player, this.mousePos));
        this.projectileCooldownCount = this.projectileCooldown;
      }
    }

    this.projectileCooldownCount++;
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw planet
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height + 130, 250, 0, Math.PI, true);
    ctx.stroke();

    this.asteroid.draw();

    this.projectiles.forEach((projectile) => {
      projectile.draw();
    });
    this.player.draw();
  }
}

class Game {
  constructor() {
    this.states = { IN_GAME: new InGame() };
    this.current_state = this.states["IN_GAME"];
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
      // console.log(
      //   event.clientX - canvas.offsetLeft,
      //   event.clientY - canvas.offsetTop
      // );
      this.events.mouse.mouseDown = true;
    } else {
      this.events.mouse.mouseDown = false;
    }
  }

  run() {
    this.current_state.update(this.events);
    this.current_state.draw();
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
