const childProcess = require('child_process')
const mime = require('mime')
const debug = require('debug')('unoconv:formats')
const parseOptions = require('./util').parseOptions

exports = module.exports = function (options = {}) {
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
