const childProcess = require('child_process')
const debug = require('debug')('unoconv:listen')
const parseOptions = require('./util').parseOptions
/**
 * Start a listener.
 *
 * @param {Object} options
 * @return {ChildProcess}
 * @api public
 */
exports = module.exports = function (options = {}) {
  options.listener = true
  const parsedOptions = parseOptions(options)
  const args = parsedOptions.args

  debug(args)
  const child = childProcess.spawn(parsedOptions.bin, args)
  child.stdout.on('data', (data) =>{
    debug(data.toString())
  })
  child.stderr.on('data', (data) => {
    debug(data.toString())
  })
  child.on('close', (code) => {
    if (code !== 0) {
      debug(`child process exited with code ${code}`)
    } else {
      debug('child process exited.')
    }
  })
  return child
}
