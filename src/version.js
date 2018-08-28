const packageVersion = require('../package.json').version
/**
 * Show current package versions
 *
 * @return {Object} Package Versions
 * @api public
 */
exports = module.exports = function () {
  const options = {
    version: true,
    string: true
  }
  return this.run(options)
    .then(function (versionText) {
      const version = versionText.split('\n')[0].split(' ')[1]
      return Promise.resolve({
        unoconv: version,
        'unoconv-promise': packageVersion
      })
    })
}
