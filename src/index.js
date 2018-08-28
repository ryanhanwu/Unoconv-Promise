const debug = require('debug')('unoconv:index')
class Unoconv {
  constructor() {
    this.run = require('./run')
    this.convert = require('./convert')
    this.formats = require('./formats')
    this.listen = require('./listen')
    this.version = require('./version')
    debug('unoconv-promise initialized')
  }
}

exports = module.exports = new Unoconv
