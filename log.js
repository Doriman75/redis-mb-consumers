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
async function consume() {
  while (true) {
    try {
      var response = await request(commander.url);
      if (response) n++;
      if (response && !commander.speed) console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}

setInterval(() => {
  console.log(n, "messages per second");
  n = 0;
}, 1000);

consume();