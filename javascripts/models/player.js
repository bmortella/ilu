const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 2;
    this.radius = 1;
  }

  update(events) {
    if (events.keys.d) {
      if (this.x + this.vel < canvas.width) this.x += this.vel;
    } else if (events.keys.a) {
      if (this.x - this.vel > 0) this.x -= this.vel;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 10, this.y + 25);
    ctx.lineTo(this.x + 10, this.y + 25);
    ctx.closePath();
    ctx.stroke();
  }
}

export { Player };
