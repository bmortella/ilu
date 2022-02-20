import { Player } from "../models/player.js";
import { Projectile } from "../models/projectile.js";
import { Asteroid, BigAsteroid } from "../models/asteroid/asteroid.js";
import { Explosion } from "../anim/explosion.js";
//import { AsteroidDesigner } from "./models/asteroid/asteroidDesigner.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Play {
  constructor() {
    this.nextState = "GAMEOVER";
    this.done = false;
  }

  startUp() {
    this.mousePos = { x: 0, y: 0 };

    this.player = new Player(canvas.width / 2, canvas.height - 200);
    this.score = 0;
    this.planetHealth = 500;

    this.projectiles = [];
    this.projectileCooldownCount = 0;

    this.asteroids = [];
    this.bigAsteroid = null;

    this.animations = [];

    setInterval(() => {
      this.spawnAsteroid();
    }, 713);

    setInterval(() => {
      if (!this.bigAsteroid) this.spawnBigAsteroid();
    }, 5000);
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
      if (this.projectileCooldownCount % 30 === 0) {
        this.projectiles.push(new Projectile(this.player, this.mousePos));
        this.projectileCooldownCount = 0;
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
            new Explosion({ x: asteroid.x, y: asteroid.y }, 2.5, 100)
          );
          this.projectiles.splice(pIndex, 1);
          this.asteroids.splice(aIndex, 1);
          this.score += 15;
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
            this.animations.push(
              new Explosion(
                { x: this.bigAsteroid.x, y: this.bigAsteroid.y },
                6,
                320
              )
            );
            this.bigAsteroid = null;
            this.score += 50;
          }
        }
      });
    }

    // Planet collision
    this.asteroids.forEach((asteroid, index) => {
      if (asteroid.y > canvas.height - 20) {
        this.planetHealth -= 25;
        this.asteroids.splice(index, 1);
      }
    });

    if (this.bigAsteroid) {
      if (this.bigAsteroid.y > canvas.height - 20) {
        this.planetHealth -= 100;
        this.bigAsteroid = null;
      }
    }

    // Animations
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

    // Score
    ctx.font = "22px Gugi";
    ctx.fillStyle = "black";
    ctx.fillText(this.score, 25, 40);

    // Planet health bar
    ctx.beginPath();
    ctx.rect(100, canvas.height - 50, 500, 20);
    ctx.stroke();

    // Inner
    ctx.beginPath();
    ctx.rect(100, canvas.height - 50, this.planetHealth, 20);
    ctx.fill();
  }
}

export { Play };
