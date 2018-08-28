const path = require('path')
const chai = require('chai')
const expect = chai.expect;

const unoconv = require('../src/index.js')

describe('unoconv.formats()', function () {
  it('should list all supported formats as a array', function (done) {
    unoconv.formats()
      .then((formats) => {
        expect(formats).to.be.an.instanceOf(Array)
        expect(formats).to.have.lengthOf.at.least(133) //supported by unoconv@0.8.2
        const singleFormat = formats[1]
        expect(singleFormat).to.be.an.instanceOf(Object)
        expect(singleFormat).to.have.property('doctype')
        expect(singleFormat).to.have.property('extension')
        expect(singleFormat).to.have.property('description')
        expect(singleFormat).to.have.property('mime')
        expect(singleFormat).to.have.property('format')
        let supported = new Set()
        formats.forEach((format) => {
          if (format.mime) {
            supported.add(`${format.extension} - ${format.mime}`)
          } else {
            supported.add(`${format.extension}`)
          }
        })
        console.log(Array.from(supported).sort())
        done()
      })
      .catch((e) => {
        done(e)
      })
  })
})
