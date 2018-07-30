require("./consumer")((message) => {
  console.log(new Date(), message);
});