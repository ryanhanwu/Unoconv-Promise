const fs = require('fs')
const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../src/index.js')

const TEST_FILE = path.join(__dirname, 'sample.doc')
const TEST_FILE_PDF = path.join(__dirname, 'sample.pdf')
const TEST_N_FILE = path.join(__dirname, 'sample2.doc')

describe('unoconv.convert()', function () {
  this.timeout(10000)

  it('should convert doc file into PDF and return Buffer', function (done) {
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
  it('should convert document first page into PDF and return output path', function (done) {
    unoconv.run({
        file: TEST_FILE,
        output: TEST_FILE_PDF,
        export: 'PageRange=1-1'
      })
      .then((outputPath) => {
        expect(outputPath).to.equal(TEST_FILE_PDF)
        expect(fs.existsSync(outputPath)).to.be.true
        fs.unlinkSync(outputPath)
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
})
