import { expect } from 'chai';

import randomNumber from './random-number';

test('should return a whole number', () => {
  const number = randomNumber(1);
  expect(typeof number).to.be.equal('number');
});
