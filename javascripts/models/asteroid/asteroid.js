import variants from "./asteroidVariants.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Asteroid {
  constructor(pos, attackX) {
    this.x = pos.x;
    this.y = pos.y;
    this.vel = 1.5;

    const rand = Math.floor(Math.random() * variants.normal.nodes.length);
    this.nodes = variants.normal.nodes[rand];
    this.radius = variants.normal.radius;

    this.angle = Math.atan2(canvas.height - this.y, attackX - this.x);
  }

  update() {
    this.x = this.x + Math.cos(this.angle) * this.vel;
    this.y = this.y + Math.sin(this.angle) * this.vel;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x + this.nodes[0].x, this.y + this.nodes[1].y);
    this.nodes.forEach((node) => {
      ctx.lineTo(this.x + node.x, this.y + node.y);
    });
    ctx.closePath();
    ctx.stroke();
  }
}

class BigAsteroid extends Asteroid {
  constructor(pos, attackX) {
    super(pos, attackX);
    this.vel = 0.6;

    const rand = Math.floor(Math.random() * variants.big.nodes.length);
    this.nodes = variants.big.nodes[rand];
    this.radius = variants.big.radius;
  }
}

export { Asteroid, BigAsteroid };
