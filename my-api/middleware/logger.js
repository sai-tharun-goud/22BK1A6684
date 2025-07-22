function logger(req, res, next) {
  req.customLog = (msg) => {
    console.log(`[${new Date().toISOString()}] ${msg}`)
  }
  next()
}

module.exports = logger
