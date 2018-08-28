const consumer = require("./consumer");
const log = require("./log");

function doConsume(message) {
  var sms = {
    "user_id": message.user_id,
    "content": message.sms.content
  }
  log.debug(`sending ${sms.content} to ${sms.user_id}`);
  log.debug("sms sent");
}

consumer.consume([
  consumer.VALIDATORS.skipIfEmpty("sms"),
  consumer.VALIDATORS.isSet("user_id"),
  consumer.VALIDATORS.isType("user_id", "string"),
  consumer.VALIDATORS.isType("sms", "object"),
  consumer.VALIDATORS.isSet("sms.content"),
  consumer.VALIDATORS.isType("sms.content", "string"),
  consumer.VALIDATORS.isLE("sms.content.length", 160)
], doConsume);