const consumer = require("./consumer");

consumer.consume((message) => {
  var email = to_email(message);
  if (!email) return;
  console.log("sending", email.subject, "to", email.user_id);
  console.log("email sent");
});

function to_email(message) {
  var error_message = null;
  [
    consumer.isType("user_id", "string"),
    consumer.isType("email", "object"),
    consumer.isType("email.subject", "string"),
    consumer.isType("email.body", "string")
  ].find(v => {
    error_message = v(message);
    return error_message != "OK"
  });

  if (error_message != "OK") return console.warn(error_message)

  return {
    "user_id": message.user_id,
    "subject": message.email.subject,
    "body": message.email.body
  }
}