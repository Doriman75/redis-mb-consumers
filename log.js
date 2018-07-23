const request = require("request-promise-native");
const commander = require('commander')
  .version("0.0.1")
  .usage('[options]')
  .option("-u, --url <url>", "url of the queue of redis-mb.")
  .parse(process.argv);

if (!commander.url) {
  console.error("url is mandatory")
  process.exit(1);
}
async function consume() {
  while (true) {
    try {
      var response = await request(commander.url);
      if (response) console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}

consume();