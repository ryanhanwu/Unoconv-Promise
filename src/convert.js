exports = module.exports = function (file, options = {}) {
  options.file = file
  options.stdout = true
  return this.run(options)
}
