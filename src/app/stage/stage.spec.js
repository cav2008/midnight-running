import { expect } from 'chai';
import sinon from 'sinon';

import Stage from './stage';

// Create spies.
const drawImageSpy = sinon.spy();

// Mock canvas html element.
const canvas = document.createElement('canvas');
canvas.getContext = () => {
  return {};
};
const context = canvas.getContext('2d');
context.drawImage = drawImageSpy;

// Create class instance.
const stageTest = new Stage(canvas, context, -1, -2, -3);

describe('constructor set up', () => {
  test('should call setCanvas', () => {
    expect(stageTest.canvas).to.be.a('object');
    expect(stageTest.ctx).to.be.a('object');
  });

  test('should call setPosition', () => {
    expect(stageTest.x).to.be.a('object');
    expect(stageTest.x.foreground).to.be.equal(0);
    expect(stageTest.x.midground).to.be.equal(0);
    expect(stageTest.x.background).to.be.equal(0);
  });

  test('should call setMoveSpeed', () => {
    expect(stageTest.dX).to.be.a('object');
    expect(stageTest.dX.foreground).to.be.equal(-1);
    expect(stageTest.dX.midground).to.be.equal(-2);
    expect(stageTest.dX.background).to.be.equal(-3);
  });

  test('should call getImage', () => {
    expect(stageTest.foreground).to.be.a('object');
    expect(stageTest.foreground.src).to.be.equal('../../assets/images/foreground.png');
    expect(stageTest.midground).to.be.a('object');
    expect(stageTest.midground.src).to.be.equal('../../assets/images/midground.png');
    expect(stageTest.background).to.be.a('object');
    expect(stageTest.background.src).to.be.equal('../../assets/images/background.png');
  });
});

describe('draw function', () => {
  test('should call drawImage function twice', () => {
    stageTest.draw();
    expect(stageTest.ctx.drawImage).to.be.calledTwice;
  });
});

describe('stageRender function', () => {
  test('should update all x positions with dX value', () => {
    stageTest.stageRender();
    expect(stageTest.x.foreground).to.be.equal(-1);
    expect(stageTest.x.midground).to.be.equal(-2);
    expect(stageTest.x.background).to.be.equal(-3);
  });

  test('should reset x positions if x + canvas width < 0', () => {
    stageTest.canvas.width = 1;
    stageTest.stageRender();
    expect(stageTest.x.foreground).to.be.equal(0);
    expect(stageTest.x.midground).to.be.equal(0);
    expect(stageTest.x.background).to.be.equal(0);
  });

  test('should call draw function 3 times', () => {
    stageTest.draw = sinon.spy();
    stageTest.stageRender();
    expect(stageTest.draw).to.be.calledThrice;
  });
});
