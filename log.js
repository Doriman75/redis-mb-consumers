function log(level, message) {
  let l = (level.toUpperCase() + "     ").substring(0, 5);
  console[level](new Date().toISOString(), `[${l}]`, message);
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