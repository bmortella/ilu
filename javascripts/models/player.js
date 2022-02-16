const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(events) {
    if (events.keys.d) {
      this.x += 2;
    } else if (events.keys.a) {
      this.x -= 2;
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
