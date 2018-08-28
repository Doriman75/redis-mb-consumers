function log(level, message) {
  console[level](new Date().toISOString(), `[${level.toUpperCase()}]`, message);
}

module.exports = {
  debug(x) {
    log("log", x);
  },
  warn(x) {
    log("warn", x);
  },
  error(x) {
    log("error", x);
  }
}