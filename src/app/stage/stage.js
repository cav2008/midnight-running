import playMusic from '../sound/sound';

import theme from '../../assets/sounds/big-blue.mp3';

export default class Stage {
  constructor(canvas, ctx, fSpeed = -2, mSpeed = -1, bSpeed = -0.5) {
    this.setCanvas(canvas, ctx);
    this.setPositions();
    this.setMoveSpeed(fSpeed, mSpeed, bSpeed);
    this.getImage();
    playMusic(theme);
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
   * Used to set the initial x positions for the backgrounds.
   */
  setPositions() {
    this.x = {
      foreground: 0,
      midground: 0,
      background: 0,
    };
  }

  /**
   * Used to set the x position change speed.
   * @param {number} fSpeed - x position move speed for the foreground.
   * @param {number} mSpeed - x position move speed for the midground.
   * @param {number} bSpeed - x position move speed for the background.
   */
  setMoveSpeed(fSpeed, mSpeed, bSpeed) {
    this.dX = {
      foreground: fSpeed,
      midground: mSpeed,
      background: bSpeed,
    };
  }

  /**
   * Used to get the background images.
   */
  getImage() {
    this.foreground = new Image();
    this.foreground.src = '../../assets/images/foreground.png';
    this.midground = new Image();
    this.midground.src = '../../assets/images/midground.png';
    this.background = new Image();
    this.background.src = '../../assets/images/background.png';
  }

  /**
   * Use to draw the image.
   * @param {HTMLImageElement} image - the image to draw.
   * @param {*} x - the x position to draw.
   */
  draw(image, x) {
    this.ctx.drawImage(image, x, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(image, x + this.canvas.width, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Used to move the background and set the move rules.
   */
  stageRender() {
    // Loop through backgrounds and update the x positions.
    Object.keys(this.x).forEach((item) => {
      this.x[item] += this.dX[item];

      if (this.x[item] + this.canvas.width < 0) {
        this.x[item] = 0;
      }
    });

    // reverse the array so it draws the background then mid and foreground.
    Object.keys(this.x).reverse().forEach((item) => {
      this.draw(this[item], this.x[item]);
    });
  }
}
