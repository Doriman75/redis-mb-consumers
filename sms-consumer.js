require("./consumer")((data) => {
  var message = null;
  try {
    message = JSON.parse(data);
  } catch (e) {
    console.warn("the message is not a valid json", data);
    return;
  }
  var sms = to_sms(message);
  if (!sms) return;

  console.log("sending", sms.content, "to", sms.user_id);

  console.log("sms sent");
});

function to_sms(message) {
  if (!message.user_id) return;
  var user_id = message.user_id;
  if (typeof user_id != "string") {
    console.warn("the user_id is not a valid string", user_id);
    return;
  }
  if (!message.sms) return;
  var sms = message.sms;
  if (!sms.content) {
    console.warn("the content of the sms is not available", sms)
    return;
  }
  var content = sms.content;
  if (typeof content != "string") {
    console.warn("the content of sms is not a valid string", content);
    return;
  }
  return {
    "user_id": user_id,
    "content": content
  }
}