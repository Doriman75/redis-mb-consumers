require("./consumer")((message, commander) => {
  if (!commander.speed) console.log(new Date(), message);
});