export default class Score {
  /**
   * @param {Object} canvas - HTML canvas object.
   * @param {Object} ctx - canvas context object.
   */
  constructor(canvas, ctx) {
    this.setCanvas(canvas, ctx);
    this.startTimeScore();
  }

  /**
   * Used to set the canvas and context so we can draw on the correct canvas.
   * @param {Object} canvas - canvas object.
   * @param {Object} ctx  - canvas context object.
   */
  setCanvas(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  /**
   * Used to create the start time.
   */
  startTimeScore() {
    this.startTime = new Date();
  }

  /**
   * Used to format time score.
   */
  formatTime() {
    const timeDifference = new Date() - this.startTime;
    this.time = [0, 0, 0];
    this.time[0] = this.addZeroToTime(Math.floor((timeDifference / 1000) / 60));
    this.time[1] = this.addZeroToTime(Math.round((timeDifference / 1000) % 60));
    this.time[2] = this.addZeroToTime(Math.round((timeDifference % 1000) / 10));
  }

  /**
   * Used to format time to always have 2 digits.
   * @param {number} time - time value.
   */
  addZeroToTime(time) {
    return `0${time}`.slice(-2);
  }

  /**
   * Used to draw the score text on the canvas.
   */
  draw() {
    const paddingRight = 60;
    this.ctx.font = '50px pressStart2p';
    this.ctx.fillStyle = 'orange';
    const scoreText = `Time: ${this.time[0]}'${this.time[1]}"${this.time[2]}`;
    this.ctx.fillText(scoreText, this.canvas.width - this.ctx.measureText(scoreText).width, paddingRight);
  }

  /**
   * Used call draw function.
   */
  scoreRender() {
    this.formatTime();
    this.draw();
  }
}
