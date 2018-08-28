const log = require("./log");
const request = require("request-promise-native");
const commander = require('commander')
  .version("0.0.1")
  .usage('[options]')
  .option("-u, --url <url>", "url of the queue of redis-mb.")
  .option("-s, --speed", "trace number of messages per second")
  .parse(process.argv);
if (!commander.url) {
  log.error("url is mandatory")
  process.exit(1);
}


function parse(validations, response) {
  let message = null;
  try {
    message = JSON.parse(response);
  } catch (e) {
    log.warn(`the message is not a valid json ${response}`);
    log.error(e);
    return;
  }

  let result = null;
  for (let v of validations) {
    result = v(message);
    if (result) break;
  }
  if (result == "skip") {
    log.debug("skip message");
    return;
  }
  if (result) {
    log.warn(result + `${JSON.stringify(message)}`);
    return;
  }
  return message;
}

function get(object, field) {
  return field.split(".").reduce((result, f) => {
    return result[f]
  }, object)
}

var validators = {
  skipIfEmpty(field) {
    return (m) => {
      if (!get(m, field)) return "skip";
    }
  },
  isLE(field, value) {
    return (m) => {
      if (get(m, field) >= value) return `the '${field}' must be less or equals than '${value}'`
    }
  },
  isSet(field) {
    return (m) => {
      if (!get(m, field)) return `the '${field}' must not be set`
    }
  },
  isType(field, type) {
    return (m) => {
      if (typeof get(m, field) != type) return `the '${field}' must be a '${type}'`;
    }
  }
}

module.exports = {
  consume: async function(validations, f) {
    while (true) {
      try {
        var response = await request(commander.url);
        if (!response) continue;
        let message = parse(validations, response);
        if (message) f(message, commander, n++);
      } catch (e) {
        log.error(e);
      }
    }
  },
  VALIDATORS: validators
}

var n = 0;
if (commander.speed) {
  setInterval(() => {
    log.debug(`${n} messages per second`);
    n = 0;
  }, 1000);
}