const consumer = require("./consumer");

function doConsume(message) {
  var email = {
    "user_id": message.user_id,
    "subject": message.email.subject,
    "body": message.email.body
  }
  console.log("sending", email.subject, "to", email.user_id);
  console.log("email sent");
}

consumer.consume([
  consumer.skipIfEmpty("email"),
  consumer.isSet("user_id"),
  consumer.isType("user_id", "string"),
  consumer.isType("email", "object"),
  consumer.isSet("email.subject"),
  consumer.isType("email.subject", "string"),
  consumer.isSet("email.body"),
  consumer.isType("email.body", "string")
], doConsume);