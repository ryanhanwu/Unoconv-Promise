const childProcess = require('child_process')
const debug = require('debug')('unoconv:listen')
const parseOptions = require('./util').parseOptions

exports = module.exports = function (options = {}) {
  options.listener = true
  const parsedOptions = parseOptions(options)
  const args = parsedOptions.args

  debug(args)

  return childProcess.spawn(parsedOptions.bin, args)
}
