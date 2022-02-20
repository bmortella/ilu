const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

const menuTheme = new Audio();
menuTheme.src = "../../assets/sounds/menu.mp3";
menuTheme.loop = true;
menuTheme.volume = 0.1;

const menuStart = new Audio();
menuStart.src = "../../assets/sounds/menu-start.mp3";
menuStart.volume = 0.1;

class Menu {
  constructor() {
    this.nextState = "PLAY";
    this.done = false;

    this.transition = false;
    this.transitionVel = 1;

    this.planetY = canvas.height / 2;
    this.titleAlpha = 1;
    this.pressToStartAlpha = 1;
    this.startUp();
  }

  startUp() {
    menuTheme.play();
  }

  update(events) {
    if (events.keys["Enter"]) {
      this.transition = true;
      menuTheme.pause();
      menuStart.play();
    }

    if (this.transition) {
      if (this.planetY === canvas.height + 130) {
        this.done = true;
      } else {
        this.planetY += this.transitionVel;
        this.titleAlpha -= 0.003;
        this.pressToStartAlpha -= 0.05;
      }
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - 200);
    ctx.lineTo(canvas.width / 2 - 10, canvas.height - 200 + 25);
    ctx.lineTo(canvas.width / 2 + 10, canvas.height - 200 + 25);
    ctx.closePath();
    ctx.stroke();

    // Draw planet
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(canvas.width / 2, this.planetY, 250, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw planet border
    ctx.beginPath();
    ctx.arc(canvas.width / 2, this.planetY, 250, 0, Math.PI * 2, true);
    ctx.stroke();

    // Draw game title
    ctx.font = "50px Gugi";
    ctx.fillStyle = `rgba(0,0,0,${this.titleAlpha})`;
    ctx.fillText("ILU", 320, this.planetY);

    // Draw press to start
    ctx.font = "24px Gugi";
    ctx.fillStyle = `rgba(0,0,0,${this.pressToStartAlpha})`;
    ctx.fillText("Pressione enter para iniciar..", 175, canvas.height - 100);
  }
}

export { Menu };
