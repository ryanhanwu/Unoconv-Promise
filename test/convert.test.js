const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../index.js')
const TEST_FILE = path.join(__dirname, 'sample.doc')
const TEST_N_FILE = path.join(__dirname, 'sample2.doc')
const TEST_N_FILE2 = path.join(__dirname, 'test.MP4')


describe('unoconv:convert', function () {
  this.timeout(10000)
  it('should convert doc file without any problem', function (done) {
    unoconv.convert(TEST_FILE)
      .then((fileBuffer) => {
        expect(fileBuffer).to.be.an.instanceOf(Buffer)
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
  it('should be rejected if file doesn\'t exist', function (done) {
    unoconv.convert(TEST_N_FILE)
      .then(() => {
        done(new Error('Should not pass here'))
      })
      .catch((e) => {
        done()
      })
  })
  it('should be rejected if file doesn\'t exist', function (done) {
    unoconv.convert(TEST_N_FILE2)
      .then(() => {
        done(new Error('Should not pass here'))
      })
      .catch((e) => {
        done()
      })
  })
})
