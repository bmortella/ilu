const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Projectile {
  constructor(player, mousePos) {
    this.x = player.x;
    this.y = player.y;

    this.vel = 4;
    this._size = 10;

    this.angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x);
  }

  update() {
    this.x = this.x + Math.cos(this.angle) * this.vel;
    this.y = this.y + Math.sin(this.angle) * this.vel;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - Math.cos(this.angle) * this._size,
      this.y - Math.sin(this.angle) * this._size
    );
    ctx.stroke();
  }
}

export { Projectile };
