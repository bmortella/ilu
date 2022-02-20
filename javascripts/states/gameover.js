const canvas = document.getElementById("canvasObj");
const ctx = canvas.getContext("2d");

class GameOver {
  constructor() {
    this.nextState = "PLAY";
    this.done = false;
  }

  startUp(persist) {
    this.score = persist.score;
  }

  update(events) {
    if (events.keys["Enter"]) {
      this.done = true;
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Gugi";
    ctx.fillStyle = "BLACK";
    ctx.fillText("GAME OVER", 200, canvas.height / 2 - 30);

    ctx.font = "20px Gugi";
    ctx.fillText(`SCORE: ${this.score}`, 210, canvas.height / 2 + 20);

    ctx.font = "18px Gugi";
    ctx.fillText("Consegue fazer melhor?", 230, canvas.height / 2 + 70);

    ctx.font = "22px Gugi";
    ctx.fillText(
      "Pressione enter para jogar novamente..",
      140,
      canvas.height - 180
    );
  }
}

export { GameOver };
