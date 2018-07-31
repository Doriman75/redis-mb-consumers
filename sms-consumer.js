const consumer = require("./consumer");

consumer.consume((message) => {
  var sms = to_sms(message);
  if (!sms) return;
  console.log("sending", sms.content, "to", sms.user_id);
  console.log("sms sent");
});

function to_sms(message) {
  var error_message = null;
  [
    consumer.isType("user_id", "string"),
    consumer.isType("sms", "object"),
    consumer.isType("sms.content", "string"),
    consumer.isLE("sms.content.length", 160)
  ].find(v => {
    error_message = v(message);
    return error_message != "OK"
  });

  if (error_message != "OK") return console.warn(error_message);

  return {
    "user_id": message.user_id,
    "content": message.sms.content
  }
}