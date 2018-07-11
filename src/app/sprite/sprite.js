export default class Sprite {
  /**
   * @param {Object} canvas - HTML canvas object.
   * @param {Object} ctx - canvas context object.
   * @param {Object} spriteData - sprites data object.
   * @param {string} spriteName - chosen sprite name.
   */
  constructor(canvas, ctx, spriteData, spriteName) {
    this.setCanvas(canvas, ctx);
    this.getSpriteData(spriteData, spriteName);
    this.setHitboxSize(this.spriteData.hitboxWidth, this.spriteData.hitboxHeight);
    this.setYOffset(this.spriteData.yOffset);
    this.getImage(this.spriteData.spriteImage);
    this.setSpriteScale(this.spriteData.scaleSize);
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
   * Used to get the sprite data from json file.
   * @param {Object} spriteData - data object for the sprite item.
   * @param {string} spriteName - sprite name.
   */
  getSpriteData(spriteData, spriteName) {
    this.spriteData = spriteData.find((item) => {
      return item.name === spriteName;
    });
  }


  /**
   * Used to set the hitbox size of the sprite.
   * @param {number} width - width of the square.
   * @param {number} height - height of the square.
   */
  setHitboxSize(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Used to set the y-axis position offset.
   * @param {number} yOffset - y-axis offset position from the bottom of the screen.
   */
  setYOffset(yOffset) {
    this.yOffset = yOffset;
  }

  /**
   * Used to create the sprite image to render.
   * @param {string} path - path to the image.
   */
  getImage(path) {
    this.imageSprite = new Image();
    this.imageSprite.src = path;
  }

  /**
   * Used to scale the sprite size up.
   * @param {number} scale - sprite scale by number.
   */
  setSpriteScale(scale) {
    this.spriteScale = scale;
  }

  /**
   * Used to draw the hitbox rectangle.
   * @param {number} x - position in the x-axis.
   * @param {number} y - position in the y-axis.
   */
  drawHitBox(x, y) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, this.width, this.height);
    // this.ctx.strokeStyle = 'yellow';
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  /**
   *
   * @param {Object} animationData - sprite animation positioning data.
   * @param {*} x - position of the drawing in the x-axis.
   * @param {*} y - position of the drawing in the y-axis.
   * @param {*} width - width of the draw window.
   * @param {*} height - height of the draw window.
   */
  drawSpriteAnimation(animationData, x, y, width, height) {
    this.ctx.drawImage(
      this.imageSprite,
      animationData.x,
      animationData.y,
      animationData.width,
      animationData.height,
      x,
      y,
      width,
      height,
    );
  }
}
