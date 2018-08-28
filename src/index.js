const debug = require('debug')('unoconv:index')
const run = require('./run')
class Unoconv {
  constructor() {
    /**
     * @param {Object} options
     * @return {Promise}
     * @api public
     */
    this.run = run
    /**
     * Convert files with unoconv command
     * @param {String} file
     * @param {Object} options
     * @return {Promise}
     * @api public
     *
     */
    this.convert = require('./convert')
    /**
     * Display supported conversion formats.
     *
     * @param {Object} options
     * @return {Promise} An Object represents all formats supported
     */
    this.formats = require('./formats')
    /**
     * Start a listener.
     *
     * @param {Object} options
     * @return {ChildProcess}
     * @api public
     */
    this.listen = require('./listen')
    this.version = require('./version')
    debug('unoconv-promise initialized')
  }
}

exports = module.exports = new Unoconv
