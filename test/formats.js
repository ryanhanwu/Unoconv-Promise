const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../index.js')

describe('unoconv:formats', function () {
  it('should list all supported formats', function (done) {
    unoconv.formats()
      .then((formats) => {
        expect(formats).to.be.an.instanceOf(Object)
        expect(formats.document).to.be.an.instanceOf(Array)
        expect(formats.document).to.have.lengthOf.at.least(31)
        expect(formats.graphics).to.be.an.instanceOf(Array)
        expect(formats.graphics).to.have.lengthOf.at.least(31)
        expect(formats.presentation).to.be.an.instanceOf(Array)
        expect(formats.presentation).to.have.lengthOf.at.least(43)
        expect(formats.spreadsheet).to.be.an.instanceOf(Array)
        expect(formats.spreadsheet).to.have.lengthOf.at.least(28)
        done()
      })
      .catch((e) => {
        done(e)
      })
  })

})
