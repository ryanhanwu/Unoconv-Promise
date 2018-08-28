/**
 * Convert files with unoconv command
 * @param {String} file
 * @param {Object} options
 * @return {Promise}
 * @api public
 *
 */
exports = module.exports = function (file, options = {}) {
  options.file = file
  options.stdout = true
  return this.run(options)
}
