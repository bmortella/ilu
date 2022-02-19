const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class Particle {
  constructor(pos, range) {
    this.x = pos.x;
    this.y = pos.y;

    this.dx = (Math.random() - 0.5) * (Math.random() * range);
    this.dy = (Math.random() - 0.5) * (Math.random() * range);

    this.particleSize = Math.random() * 3;
    this.alpha = 1;
  }

  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,0,0,${this.alpha})`;
    ctx.rect(this.x, this.y, this.particleSize, this.particleSize);

    ctx.fill();
  }
}

class Explosion {
  constructor(pos, range, size) {
    this.x = pos.x;
    this.y = pos.y;

    this.particles = [];
    for (let i = 0; i < size; i++) {
      this.particles.push(new Particle(pos, range));
    }
  }

  update() {
    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
  }

  draw() {
    this.particles.forEach((particle) => {
      particle.draw();
    });
  }

  isFinished() {
    if (this.particles.length > 0) {
      return false;
    }
    return true;
  }
}

export { Explosion };
