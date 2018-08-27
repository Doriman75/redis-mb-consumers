const request = require("request-promise-native");
const commander = require('commander')
  .version("0.0.1")
  .usage('[options]')
  .option("-u, --url <url>", "url of the queue of redis-mb.")
  .option("-s, --speed", "trace number of messages per second")
  .parse(process.argv);
if (!commander.url) {
  console.error("url is mandatory")
  process.exit(1);
}
var n = 0;

function get(object, field) {
  return field.split(".").reduce((result, f) => {
    return result[f]
  }, object)
}

function validate(validations, message) {
  for (let v of validations) {
    let result = v(message);
    if (result) return result;
  }
}


module.exports = {
  consume: async function(validations, f) {
    while (true) {
      try {
        var response = await request(commander.url);
        if (!response) continue;
        try {
          let message = JSON.parse(response);
          let error_message = validate(validations, message);
          if (error_message == "skip") {
            console.log(new Date().toISOString(), "skip message");
            continue;
          }
          if (error_message) {
            console.warn(new Date().toISOString(), error_message, JSON.stringify(message));
            continue;
          }
          f(message, commander, n++);
        } catch (e) {
          console.warn(new Date().toISOString(), "the message is not a valid json", response);
          console.error(new Date().toISOString(), e)
        }
      } catch (e) {
        console.error(new Date().toISOString(), e);
      }
    }
  },
  isLE: (field, value) => {
    return (m) => {
      if (get(m, field) >= value) return `the '${field}' must be less or equals than '${value}'`
    }
  },
  skipIfEmpty: (field) => {
    return (m) => {
      if (!get(m, field)) return "skip";
    }
  },
  isSet: (field) => {
    return (m) => {
      if (!get(m, field)) return `the '${field}' must not be empty`
    }
  },
  isType: (field, type) => {
    return (m) => {
      if (typeof get(m, field) != type) return `the '${field}' must be a string`
    }
  }
}

if (commander.speed) {
  setInterval(() => {
    console.log(n, "messages per second");
    n = 0;
  }, 1000);
}