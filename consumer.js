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


module.exports = function(f) {
  (async function consume() {
    while (true) {
      try {
        var response = await request(commander.url);
        if (response) f(response, n++);
      } catch (e) {
        console.error(e);
      }
    }
  })();
}


if (commander.speed) {
  setInterval(() => {
    console.log(n, "messages per second");
    n = 0;
  }, 1000);
}