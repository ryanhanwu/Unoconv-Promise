const childProcess = require('child_process')
const mime = require('mime')
const debug = require('debug')('unoconv-promise')

const Unoconv = exports = module.exports = {}
class UnsupportedError extends Error {}

const parseOptions = (options) => {
 
  let bin = 'unoconv'
  let childArgs = []
  for(const key in options) {
    switch (key) {
    case 'file':
      break
    case 'connection':
      childArgs.push('-c' + options[key])
      break
    case 'doctype':
      childArgs.push('-d' + options[key])
      break
    case 'export':
      childArgs.push('-e' + options[key])
      break
    case 'format':
      childArgs.push('-f' + options[key])
      break
    case 'field':
      childArgs.push('-F' + options[key])
      break
    case 'import':
      childArgs.push('-i' + options[key])
      break
    case 'import-filter-name': 
      childArgs.push('-I' + options[key])
      break
    case 'listener':
      childArgs.push('-l' + options[key])
      break
    case 'no-launch':
      childArgs.push('-n' + options[key])
      break
    case 'output':
      childArgs.push('-o' + options[key])
      break
    case 'pipe': 
      childArgs.push('--pipe' + options[key])
      break
    case 'password': //0.8.2
      childArgs.push('--password' + options[key])
      break
    case 'port':
      childArgs.push('-p' + options[key])
      break
    case 'preserve':  //0.8.2
      childArgs.push('--preserve')
      break
    case 'printer': 
      childArgs.push('-P' +  + options[key])
      break
    case 'server':
      childArgs.push('-s' + options[key])
      break
    case 'show':
      childArgs.push('--show')
      break
    case 'stdin':
      childArgs.push('--stdin')
      break
    case 'stdout':
      childArgs.push('--stdout')
      break
    case 'template':
      childArgs.push('-t' + options[key])
      break
    case 'timeout':
      childArgs.push('-T' + options[key])
      break
    case 'verbose':
      childArgs.push('-v' + options[key])
      break
    case 'version':
      childArgs.push('--version')
      break
    default:
      throw(new UnsupportedError(key))
    }
  }
  return {
    bin: options.bin || bin,
    args: childArgs
  }
}
/**
 * @param {Object} options
 * @return {Promise}
 * @api public
 */
Unoconv.run = function (options = {}) {
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
 * Convert files with unoconv command
 * @param {String} file
 * @param {Object} options
 * @return {Promise}
 * @api public
 *
 */
Unoconv.convert = function (file, options = {}) {
  options.file = file
  options.stdout = true
  return Unoconv.run(options)
}

/**
 * Start a listener.
 *
 * @param {Object} options
 * @return {ChildProcess}
 * @api public
 */
Unoconv.listen = function (options = {}) {
  options.listener = true
  const parsedOptions = parseOptions(options)
  const args = parsedOptions.args
  
  debug(args)
  
  return childProcess.spawn(parsedOptions.bin, args)
}

/**
 * Display supported conversion formats.
 *
 * @param {Object} options
 * @return {Promise} An Object represents all formats supported
 */
Unoconv.formats = function (options = {}) {
  return new Promise(function (resolve, reject) {
    options.show = true
    const parsedOptions = parseOptions(options)
    const args = parsedOptions.args

    debug(args)
    
    const supportedFormats = []
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
            supportedFormats.push({
              'format': format,
              'doctype': docType,
              'extension': extension,
              'description': description,
              'mime': mime.getType(extension)
            })
          }
        }
      })
      resolve(supportedFormats)
    })
  })
}
