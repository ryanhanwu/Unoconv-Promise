class UnsupportedError extends Error {}

exports = module.exports = {
  UnsupportedError: UnsupportedError,
  parseOptions: (options) => {
    let bin = 'unoconv'
    let childArgs = []
    for (const key in options) {
      switch (key) {
      case 'file': // Target File
      case 'string': //Output as string
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
      case 'preserve': //0.8.2
        childArgs.push('--preserve')
        break
      case 'printer':
        childArgs.push('-P' + options[key])
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
        throw (new UnsupportedError(key))
      }
    }
    return {
      bin: options.bin || bin,
      args: childArgs
    }
  }
}
