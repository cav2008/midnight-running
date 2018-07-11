import Character from './character/character';
import Obstacle from './obstacle/obstacle';
import Stage from './stage/stage';
import Score from './score/score';

import getRandomNum from './helpers/random-number/random-number';

export default new class App {
  constructor() {
    this.createGame();
    this.startGame();
  }

  /**
   * General function used to set up the game.
   */
  createGame() {
    this.createCanvas();
    this.createStage();
    this.createScore();
    this.createPlayer();
    this.createObstacle();

    this.render = this.render.bind(this);
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
  }

  /**
   * Used to create the canvas.
   */
  createCanvas() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Used to create the background.
   */
  createStage() {
    this.stage = new Stage(this.canvas, this.ctx);
  }

  /**
   * Used to create the background.
   */
  createScore() {
    this.score = new Score(this.canvas, this.ctx);
  }

  /**
   * Used to create a character for the player to use.
   */
  createPlayer() {
    this.player = new Character(this.canvas, this.ctx, 'captainFalcon');
  }

  /**
   * Used to create obstacles for player to dodge.
   */
  createObstacle() {
    this.obstacles = [
      new Obstacle(this.canvas, this.ctx, 'blueCar', -12),
      new Obstacle(this.canvas, this.ctx, 'pinkCar', -15),
    ];

    this.currentObstacle = this.obstacles[getRandomNum(this.obstacles.length)];
  }

  /**
   * Used to start the redrawing and the game.
   */
  startGame() {
    this.gameSpeed = 10;
    this.baseTime = new Date();
    this.gameOverMsgShowed = false;

    this.startInterval(this.render, this.gameSpeed);
  }

  /**
   * Used to render the game and redraw items.
   */
  render() {
    this.clearCanvas();
    this.stage.stageRender();
    this.score.scoreRender();
    this.player.playerRender();
    this.player.jumpingState();
    this.renderRandomObstacle();
    this.collisionDetection();
    this.increaseDifficulty();
  }

  /**
   * Used to detect if the player has collided with the obstacle.
   */
  collisionDetection() {
    const { x: px, y: py, width: pWidth, height: pHeight } = this.player;

    this.obstacles.forEach((item) => {
      const { x: bx, y: by, width: bWidth, height: bHeight } = item;
      const leftSideHit = px < bx + bWidth;
      const rightSideHit = px + pWidth > bx;
      const topSideHit = py < by + bHeight;
      const bottomSideHit = py + pHeight > by;

      if (leftSideHit && rightSideHit && topSideHit && bottomSideHit) {
        this.gameOver();
      }
    });
  }

  /**
   * Used to display game over message and reset game.
   */
  gameOver() {
    if (!this.gameOverMsgShowed) {
      window.alert('Game over');
      this.gameOverMsgShowed = true;
    }
    location.reload();
  }

  /**
   * Used to render a random obstacle one at a time
   */
  renderRandomObstacle() {
    if (this.currentObstacle.hasGoneOffScreen()) {
      this.currentObstacle.resetPosition();
      this.currentObstacle = this.obstacles[getRandomNum(this.obstacles.length)];
    } else {
      this.currentObstacle.obstacleRender();
    }
  }

  /**
   * Used to increase the difficulty every 10 seconds.
   */
  increaseDifficulty() {
    const difficultyIncreaseTime = 10000;

    if (new Date() - this.baseTime >= difficultyIncreaseTime) {
      this.gameSpeed = this.gameSpeed * 0.8;
      this.removeInterval(this.interval);
      this.startInterval(this.render, this.gameSpeed);
      this.baseTime = new Date();
    }
  }

  /**
   * Used to start the render interval.
   * @param {Function} cb - callback function to run.
   * @param {number} timer - interval timer.
   */
  startInterval(cb, timer) {
    this.interval = setInterval(cb, timer);
  }

  /**
   * Used to remove interval.
   * @param {Object} interval - the interval object.
   */
  removeInterval(interval) {
    clearInterval(interval);
  }

  /**
   * Used to clear the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Used to handle the keydown event. If space is pressed then make the character jump.
   * @param {Object} e - event.
   */
  keyDownHandler(e) {
    if (e.keyCode === 32 && !this.player.jumping) {
      this.player.makePlayerJump();
    }
  }
};
