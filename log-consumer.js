const consumer = require("./consumer");

consumer.consume((message, commander) => {
  if (!commander.speed) console.log(new Date(), message);
});