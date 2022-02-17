import variants from "./asteroidVariants.js";

const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Asteroid {
  constructor(pos, attackAngle) {
    this.x = pos.x;
    this.y = pos.y;

    let rand = Math.floor(Math.random() * variants.normal.nodes.length);
    this.nodes = variants.normal.nodes[rand];
    this.radius = variants.normal.radius;
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

export { Asteroid };
