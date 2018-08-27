const consumer = require("./consumer");

function doConsume(message) {
  var sms = {
    "user_id": message.user_id,
    "content": message.sms.content
  }
  console.log("sending", sms.content, "to", sms.user_id);
  console.log("sms sent");
}

consumer.consume([
  consumer.skipIfEmpty("sms"),
  consumer.isSet("user_id"),
  consumer.isType("user_id", "string"),
  consumer.isType("sms", "object"),
  consumer.isSet("sms.content"),
  consumer.isType("sms.content", "string"),
  consumer.isLE("sms.content.length", 160)
], doConsume);