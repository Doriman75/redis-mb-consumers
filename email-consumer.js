require("./consumer")((data) => {
  var message = null;
  try {
    message = JSON.parse(data);
  } catch (e) {
    console.warn("the message is not a valid json", data);
    return;
  }
  var email = to_email(message);
  if (!email) return;
  console.log("sending", email.subject, "to", email.user_id);

  console.log("email sent");
});

function to_email(message) {
  if (!message.user_id) return;
  var user_id = message.user_id;
  if (typeof user_id != "string") {
    console.warn("the user_id is not a valid string", user_id);
    return;
  }
  if (!message.email) return;
  var email = message.email;
  if (!email.subject) {
    console.warn("the subject of the email is not available", email);
    return;
  }
  if (!email.body) {
    console.warn("the body of the email is not available", email);
    return;
  }

  var subject = email.subject;
  if (typeof subject != "string") {
    console.warn("the subject of email is not a valid string", subject);
    return;
  }

  var body = email.body;
  if (typeof body != "string") {
    console.warn("the body of email is not a valid string", subject);
    return;
  }

  return {
    "user_id": user_id,
    "subject": subject,
    "body": body
  }
}