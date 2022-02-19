import { Player } from "./models/player.js";
import { Projectile } from "./models/projectile.js";
import { Asteroid, BigAsteroid } from "./models/asteroid/asteroid.js";
import { AsteroidDesigner } from "./models/asteroid/asteroidDesigner.js";
import { Explosion } from "./anim/explosion.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
// ctx.strokeStyle
// mouseOut

canvas.focus();
ctx.imageSmoothingEnabled = true;

class InGame {
  constructor() {
    this.mousePos = { x: 0, y: 0 };

    this.player = new Player(canvas.width / 2, canvas.height - 200);

    this.projectiles = [];

    //TODO: usar módulo
    this.projectileCooldown = -30; // frames
    this.projectileCooldownCount = 0;

    // this.asteroidDesigner = new AsteroidDesigner(
    //   { x: canvas.width / 2, y: 300 },
    //   "normal"
    // );

    this.asteroids = [];
    this.bigAsteroid = null;

    this.animations = [];

    setInterval(() => {
      this.spawnAsteroid();
    }, 800);
    // setInterval(() => {
    //   this.spawnAsteroid();
    // }, 713);

    // setInterval(() => {
    //   if (!this.bigAsteroid) this.spawnBigAsteroid();
    // }, 5000);
  }

  spawnAsteroid() {
    this.asteroids.push(
      new Asteroid(
        { x: Math.random() * canvas.width, y: -30 },
        Math.random() * canvas.width
      )
    );
  }

  spawnBigAsteroid() {
    const x = Math.random() * canvas.width;
    this.bigAsteroid = new BigAsteroid({ x: x, y: -80 }, x);
  }

  update(events) {
    // Update player
    this.player.update(events);

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

    this.mousePos.x = events.mouse.mouseCoords.x;
    this.mousePos.y = events.mouse.mouseCoords.y;

    if (events.mouse.mouseDown) {
      if (this.projectileCooldownCount >= 0) {
        this.projectiles.push(new Projectile(this.player, this.mousePos));
        this.projectileCooldownCount = this.projectileCooldown;
      }
    }

    this.projectileCooldownCount++;

    // Update asteroids + collision
    //this.asteroidDesigner.update(events);
    this.asteroids.forEach((asteroid, aIndex) => {
      asteroid.update();
      this.projectiles.forEach((projectile, pIndex) => {
        const dist = Math.hypot(
          projectile.x - asteroid.x,
          projectile.y - asteroid.y
        );

        if (dist - asteroid.radius - projectile.radius < 1) {
          this.animations.push(
            new Explosion({ x: asteroid.x, y: asteroid.y }, 2.5)
          );
          this.projectiles.splice(pIndex, 1);
          this.asteroids.splice(aIndex, 1);
        }
      });
    });

    if (this.bigAsteroid) {
      this.bigAsteroid.update();
      this.projectiles.forEach((projectile, index) => {
        if (!this.bigAsteroid) return;

        const dist = Math.hypot(
          projectile.x - this.bigAsteroid.x,
          projectile.y - this.bigAsteroid.y
        );

        if (dist - this.bigAsteroid.radius - projectile.radius < 1) {
          this.projectiles.splice(index, 1);
          if (this.bigAsteroid.hit()) {
            this.bigAsteroid = null;
          }
        }
      });
    }

    this.animations.forEach((animation, index) => {
      if (!animation.isFinished()) {
        animation.update();
      } else {
        this.animations.splice(index, 1);
      }
    });
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw planet
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height + 130, 250, 0, Math.PI, true);
    ctx.stroke();

    //this.asteroidDesigner.draw();

    if (this.bigAsteroid) {
      this.bigAsteroid.draw();
    }

    this.asteroids.forEach((asteroid) => {
      asteroid.draw();
    });

    this.projectiles.forEach((projectile) => {
      projectile.draw();
    });

    this.player.draw();

    this.animations.forEach((animation) => {
      animation.draw();
    });
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
