function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code)
}

module.exports = { isValidShortcode }
