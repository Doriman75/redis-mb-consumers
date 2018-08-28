const consumer = require("./consumer");
const log = require("./log");

function doConsume(message) {
  var email = {
    "user_id": message.user_id,
    "subject": message.email.subject,
    "body": message.email.body
  }
  log.debug(`sending ${email.subject} to ${email.user_id}`);
  log.debug("email sent");
}

consumer.consume([
  consumer.VALIDATORS.skipIfEmpty("email"),
  consumer.VALIDATORS.isSet("user_id"),
  consumer.VALIDATORS.isType("user_id", "string"),
  consumer.VALIDATORS.isType("email", "object"),
  consumer.VALIDATORS.isSet("email.subject"),
  consumer.VALIDATORS.isType("email.subject", "string"),
  consumer.VALIDATORS.isSet("email.body"),
  consumer.VALIDATORS.isType("email.body", "string")
], doConsume);