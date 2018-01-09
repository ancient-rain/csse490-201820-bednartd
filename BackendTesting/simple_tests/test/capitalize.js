const capitalize = require("../capitalize");

const chai = require("chai");
const expect = chai.expect;

const noWord = '';
const noCap = 'test';
const allCap = 'TEST';
const firstLetterCap = 'Test';
const secondLetterCap = 'tEst';
const firstAndSecondLetterCap = 'TEst';
const reverse = 'tEST';

expect(capitalize(noWord)).to.equal('');

expect(capitalize(noCap)).to.equal('Test');

expect(capitalize(allCap)).to.equal('Test');

expect(capitalize(firstLetterCap)).to.equal('Test');

expect(capitalize(secondLetterCap)).to.equal('Test');

expect(capitalize(firstAndSecondLetterCap)).to.equal('Test');

expect(capitalize(reverse)).to.equal('Test');
