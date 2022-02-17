const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class AsteroidBuilder {
  constructor(position, type) {
    this.position = position;
    this.types = {
      1: 80,
      2: 40,
      3: 20,
    };
    this.radius = this.types[type];
    this.nodes = [];
    this.normalizedNodes = [];
  }

  addNode(pos) {
    this.nodes.push({ x: pos.x, y: pos.y });
    this.normalizedNodes.push({
      x: pos.x - this.position.x,
      y: pos.y - this.position.y,
    });
  }

  update(events) {
    if (events.keys.x) {
      if (this.nodes.length === 0) {
        this.addNode(events.mouse.mouseCoords);
      } else if (
        this.nodes[this.nodes.length - 1].x !== events.mouse.mouseCoords.x &&
        this.nodes[this.nodes.length - 1].y !== events.mouse.mouseCoords.y
      ) {
        this.addNode(events.mouse.mouseCoords);
      }
    } else if (events.keys[" "]) {
      console.log(this.normalizedNodes);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    if (this.nodes.length > 0) {
      ctx.beginPath();
      ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
      this.nodes.forEach((node) => {
        ctx.lineTo(node.x, node.y);
      });
      ctx.closePath();
      ctx.stroke();
    }
  }
}

export { AsteroidBuilder };
