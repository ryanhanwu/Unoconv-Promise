const childProcess = require('child_process')
const mime = require('mime')
const debug = require('debug')('unoconv-promise')
const unoconv = exports = module.exports = {}
class UnsupportedError extends Error {}

const parseOptions = (options) => {
  let bin = 'unoconv'
  let childArgs = []
  if (options.timeout) {
    childArgs.push('-f' + options.outputFormat)
  } else {
    childArgs.push('-T' + 10) //Default: wait 10 seconds
  }
  if (options.outputFormat)
    childArgs.push('-f' + options.outputFormat)
  if (options.port)
    childArgs.push('-p' + options.port)
  if (options.args) {
    options.args.forEach((arg) => {
      childArgs.push(arg)
    })
  }
  return {
    bin: options.bin || bin,
    args: childArgs
  }
}
/**
 * Convert files with unoconv command
 * @param {String} file
 * @param {Object} options
 * @return {Promise}
 * @api public
 *
 */
unoconv.convert = function (file, options = {}) {
  return new Promise(function (resolve, reject) {
    let stdout = []
    let stderr = []
    const args = [
      '--stdout'
    ]
    const parsedOptions = parseOptions(options)
    args.concat(parsedOptions.args)

    args.push(file)

    debug(args)

    const child = childProcess.spawn(parsedOptions.bin, args)

    child.stdout.on('data', function (data) {
      stdout.push(data)
    })

    child.stderr.on('data', function (data) {
      stderr.push(data)
    })

    child.on('exit', function () {
      if (stderr.length) {
        return reject(new Error(Buffer.concat(stderr).toString()))
      }
      resolve(Buffer.concat(stdout))
    })
  })
}

/**
 * Start a listener.
 *
 * @param {Object} options
 * @return {ChildProcess}
 * @api public
 */
unoconv.listen = function (options = {}) {
  const args = ['--listener']
  const parsedOptions = parseOptions(options)
  args.concat(parsedOptions.args)

  return childProcess.spawn(parsedOptions.bin, args)
}

/**
 * Display supported conversion formats.
 *
 * @param {Object} options
 * @return {Promise} An Object represents all formats supported
 */
unoconv.formats = function (options = {}) {
  return new Promise(function (resolve, reject) {
    const args = ['--show']
    const supportedFormats = {
      document: [],
      graphics: [],
      presentation: [],
      spreadsheet: []
    }
    const parsedOptions = parseOptions(options)
    args.concat(parsedOptions.args)

    childProcess.execFile(parsedOptions.bin, args, function (err, stdout, stderr) {
      if (err) {
        return reject(err)
      }

      // For some reason --show outputs to stderr instead of stdout
      let lines = stderr.split('\n')
      let docType
      lines.forEach(function (line) {
        if (line === 'The following list of document formats are currently available:') {
          docType = 'document'
        } else if (line === 'The following list of graphics formats are currently available:') {
          docType = 'graphics'
        } else if (line === 'The following list of presentation formats are currently available:') {
          docType = 'presentation'
        } else if (line === 'The following list of spreadsheet formats are currently available:') {
          docType = 'spreadsheet'
        } else {
          var format = line.match(/^(.*)-/)

          if (format) {
            format = format[1].trim()
          }

          var extension = line.match(/\[(.*)\]/)

          if (extension) {
            extension = extension[1].trim().replace('.', '')
          }

          var description = line.match(/-(.*)\[/)

          if (description) {
            description = description[1].trim()
          }

          if (format && extension && description) {
            supportedFormats[docType].push({
              'format': format,
              'extension': extension,
              'description': description,
              'mime': mime.getType(extension)
            })
          }
        }
      })

      if (supportedFormats.document.length < 1 &&
        supportedFormats.graphics.length < 1 &&
        supportedFormats.presentation.length < 1 &&
        supportedFormats.spreadsheet.length < 1) {
        return reject(new Error('Unable to detect supported formats'))
      }

      resolve(supportedFormats)
    })
  })
}
