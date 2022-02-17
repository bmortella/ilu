import variants from "./asteroidVariants.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Asteroid {
  constructor(pos, attackAngle) {
    let rand = Math.floor(Math.random() * variants.normal.nodes.length);
    this.nodes = variants.normal.nodes[rand];
    this.radius = variants.normal.radius;
    this.pos = pos;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.pos.x + this.nodes[0].x, this.pos.y + this.nodes[1].y);
    this.nodes.forEach((node) => {
      ctx.lineTo(this.pos.x + node.x, this.pos.y + node.y);
    });
    ctx.closePath();
    ctx.stroke();
  }
}

export { Asteroid };
