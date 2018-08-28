const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../index.js')

describe('unoconv', function () {
  it('should convert doc file without any problem', function (done) {
    unoconv
      .run({
        version: true
      })
      .then((version) => {
        expect(version).to.be.an.instanceOf(Buffer)
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
})
