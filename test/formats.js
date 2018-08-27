const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../index.js')

describe('unoconv:formats', function () {

  it('should list all supported formats as a array', function (done) {
    unoconv.formats()
      .then((formats) => {
        expect(formats).to.be.an.instanceOf(Array)
        expect(formats).to.have.lengthOf.at.least(133) //with unoconv@0.8.2
        done()
      })
      .catch((e) => {
        done(e)
      })
  })

})
