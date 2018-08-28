const parseOptions = require('./util').parseOptions
const childProcess = require('child_process')
const debug = require('debug')('unoconv:run')
/**
 * @param {Object} options
 * @return {Promise}
 * @api public
 */
exports = module.exports = function (options = {}) {
  return new Promise(function (resolve, reject) {
    const parsedOptions = parseOptions(options)
    const args = parsedOptions.args
    if (options.file) {
      args.push(options.file)
    }

    debug(args)

    const child = childProcess.spawn(parsedOptions.bin, args)
    const stdout = []
    const stderr = []

    child.on('error', (err) => {
      debug(err)
      if (err.message.indexOf('ENOENT') > -1) {
        console.error('Unoconv command not found')
      }
      return reject(err)
    })

    child.stdout.on('data', function (data) {
      stdout.push(data)
    })

    child.stderr.on('data', function (data) {
      stderr.push(data)
    })

    child.on('exit', function () {
      if (stderr.length) {
        return reject(new Error(Buffer.concat(stderr).toString('utf8')))
      }
      if (options.string) {
        resolve(Buffer.concat(stdout).toString('utf8'))
      } else if (options.output) {
        resolve(options.output)
      } else {
        resolve(Buffer.concat(stdout))
      }

    })

  })
}
