import Sprite from '../sprite/sprite';

import debounce from '../helpers/debounce/debounce';
import scaleDrawing from '../helpers/multiply/multiply';

import characterData from '../../data/characters.json';

export default class Character extends Sprite {
  /**
   * @param {Object} canvas - HTML canvas object.
   * @param {Object} ctx - canvas context object.
   * @param {string} characterName - name of the character to use.
   */
  constructor(canvas, ctx, characterName) {
    super(canvas, ctx, characterData, characterName);
    this.setPosition();
    this.setIntialJumpState();
    this.setJumpHeight(this.spriteData.jumpHeight);
    this.setRunSpriteAnimation(this.spriteData.runAnimation);
    this.setJumpSpriteAnimation(this.spriteData.jumpAnimation);

    // Used to change the running animation rate.
    this.updateRunFrame = debounce(this.updateRunFrame.bind(this), 250);
  }

  /**
   * Used to set the X and Y position of the player square.
   */
  setPosition() {
    this.x = this.canvas.width / 10;
    this.y = this.canvas.height - this.height - this.yOffset;
  }

  /**
   * Used to set the jump state.
   */
  setIntialJumpState() {
    this.jumping = false;
    this.jumpStatus = {
      up: true,
      down: true,
    };
  }

  /**
   * Used to set jump height.
   * @param {number} height - how high the character can jump.
   */
  setJumpHeight(height) {
    this.jumpHeight = height;
  }

  /**
   * Used to set the running animation.
   * @param {Array} runAnimation - array of objects of running sprite data.
   */
  setRunSpriteAnimation(runAnimation) {
    this.currentRunFrame = 0;

    this.runAnimation = runAnimation;
  }

  /**
   * Used to set the jumping animation.
   * @param {Array} jumpAnimation - array of objects of jumping sprite data.
   */
  setJumpSpriteAnimation(jumpAnimation) {
    this.currentJumpFrame = 0;

    this.jumpAnimation = jumpAnimation;
  }

  /**
   * Used to draw hitbox and image.
   */
  draw() {
    super.drawHitBox(this.x, this.y);

    if (this.jumping) {
      const jumpAnimationData = this.jumpAnimation[this.currentJumpFrame];
      const spriteScaleWidth = scaleDrawing(jumpAnimationData.width, this.spriteScale);
      const spriteScaleHeight = scaleDrawing(jumpAnimationData.height, this.spriteScale);

      super.drawSpriteAnimation(jumpAnimationData, this.x, this.y, spriteScaleWidth, spriteScaleHeight);
    } else {
      const runAnimationData = this.runAnimation[this.currentRunFrame];
      const spriteScaleWidth = scaleDrawing(runAnimationData.width, this.spriteScale);
      const spriteScaleHeight = scaleDrawing(runAnimationData.height, this.spriteScale);

      super.drawSpriteAnimation(runAnimationData, this.x, this.y, spriteScaleWidth, spriteScaleHeight);
    }
  }

  /**
   * Used to draw the player square.
   */
  playerRender() {
    if (this.jumping) {
      this.y += this.movePlayerY;
    }

    this.updateRunFrame();

    this.draw();
  }

  /**
   * Used to update which running frame it should be on.
   */
  updateRunFrame() {
    this.currentRunFrame = this.currentRunFrame === this.runAnimation.length - 1 ?
      0 : this.currentRunFrame + 1;
  }

  /**
   * Used control the jump states.
   */
  jumpingState() {
    if (this.jumpStatus.up) {
      this.movePlayerY = -5;
      this.currentJumpFrame = 0;

      this.jumpStatus.up = this.y > this.canvas.height - (scaleDrawing(this.height, this.jumpHeight));
    } else if (this.jumpStatus.down) {
      this.movePlayerY = +5;
      this.currentJumpFrame = 1;

      this.jumpStatus.down = this.y + this.height + this.yOffset < this.canvas.height;
    } else {
      this.jumping = false;
    }
  }

  /**
   * Used to make the player perform a jump action.
   */
  makePlayerJump() {
    this.jumping = true;
    this.jumpStatus = {
      up: true,
      down: true,
    };
  }
}
