import Sprite from '../sprite/sprite';

import scaleDrawing from '../helpers/multiply/multiply';

import obstacleData from '../../data/obstacles.json';

export default class Obstacle extends Sprite {
  /**
   * @param {Object} canvas - HTML canvas object.
   * @param {Object} ctx - canvas context object.
   * @param {string} obstacleName - name of the obstacle to use.
   * @param {number} moveSpeed - sets the obstacle movement speed.
   */
  constructor(canvas, ctx, obstacleName, moveSpeed = -2) {
    super(canvas, ctx, obstacleData, obstacleName);
    this.setPosition();
    this.setSpriteAnimation(this.spriteData.driveAnimation);
    this.setMoveSpeed(moveSpeed);
  }

  /**
   * Used to get the obstacle data from json file.
   * @param {string} obstacleName - obstacle name.
   */
  getObstacleData(obstacleName) {
    return obstacleData.find((item) => {
      return item.name === obstacleName;
    });
  }

  /**
   * Used to set the X and Y position of the obstacle square.
   */
  setPosition() {
    this.x = this.canvas.width;
    this.y = this.canvas.height - this.height - this.yOffset;
  }

  /**
   * Used to set the drive animation.
   * @param {Object} driveAnimation - object for car sprite data.
   */
  setSpriteAnimation(driveAnimation) {
    this.driveAnimation = driveAnimation;
  }

  /**
   * Used to set the obstacle move speed.
   * @param {number} speed - obstacle move speed.
   */
  setMoveSpeed(speed) {
    this.moveObstacleX = speed;
  }

  /**
   * Used to draw the square.
   */
  draw() {
    super.drawHitBox(this.x, this.y);

    const obstacleAnimationData = this.driveAnimation;
    const spriteScaleWidth = scaleDrawing(obstacleAnimationData.width, this.spriteScale);
    const spriteScaleHeight = scaleDrawing(obstacleAnimationData.height, this.spriteScale);

    super.drawSpriteAnimation(obstacleAnimationData, this.x, this.y, spriteScaleWidth, spriteScaleHeight);
  }

  /**
   * Used to move obstacle and sets the rules.
   */
  obstacleRender() {
    this.x += this.moveObstacleX;

    this.draw(this.x, this.y);
  }

  /**
   * Used to check if this obstacle has gone off the screen.
   */
  hasGoneOffScreen() {
    if (this.x + this.width < 0) {
      return true;
    }

    return false;
  }

  /**
   * Used to reset the obstacle x position if it goes out of screen on the left.
   */
  resetPosition() {
    if (this.hasGoneOffScreen()) {
      this.x = this.canvas.width;
    }
  }
}
