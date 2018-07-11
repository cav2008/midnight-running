import { expect } from 'chai';

import multiply from './multiply';


const scaledValue = multiply(2, 2);

test('should return number', () => {
  expect(typeof scaledValue).to.be.equal('number');
});

test('should be scaledValue of 4', () => {
  expect(scaledValue).to.be.equal(4);
});
