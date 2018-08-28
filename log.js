var labels = {
  "log": "DEBUG",
  "warn": "WARN ",
  "error": "ERROR"
}

function log(level, message) {
  console[level](new Date().toISOString(), `[${labels[level]}]`, message);
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