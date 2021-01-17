const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../src/index.js')
const UnsupportedError = require('../src/util').UnsupportedError

describe('unoconv.version()', function () {
  it('should show unoconv and package version', function (done) {
    unoconv
      .version()
      .then((versionObj) => {
        expect(versionObj).to.be.a('object');
        expect(versionObj).to.have.property('unoconv')
        expect(versionObj).to.have.property('unoconv-promise')
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
})
describe('unoconv.run()', function () {
  it('should show unoconv version', function (done) {
    unoconv
      .run({
        verbose: true,
        version: true,
        string: true
      })
      .then((version) => {
        expect(version).to.be.a('string');
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
  it('should be rejected if there\'s unknown options', function (done) {
    unoconv
      .run({
        unknown: "no sure whats this"
      })
      .then(() => {
        done(new Error('Should not pass here'))
      })
      .catch((e) => {
        expect(e).to.be.an.instanceOf(UnsupportedError)
        done()
      })
  })
})
