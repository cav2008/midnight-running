import { expect } from 'chai';
import sinon from 'sinon';

import debounce from './debounce';

const spyCallbackFunc = sinon.spy();

const debounceFunc = debounce(spyCallbackFunc, 1000);

test('should return function', () => {
  expect(typeof debounceFunc).to.be.equal('function');
});

test('should run callback after 1 second after first call', (done) => {
  debounceFunc();
  debounceFunc();
  expect(spyCallbackFunc).to.be.calledOnce;

  setTimeout(() => {
    debounceFunc();
    expect(spyCallbackFunc).to.be.calledTwice;
    done();
  }, 1000);
});
