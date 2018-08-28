const packageVersion = require('../package.json').version
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
