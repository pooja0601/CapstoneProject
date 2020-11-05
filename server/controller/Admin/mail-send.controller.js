const db = require("../../models");
const Notification = db.notifications;
var uuid = require("uuid");
var User = db.users;
module.exports = function (app) {
  app.post("/api/sendMail", sendMails);
  app.post("/api/getMails", getMails);
};

function sendMails(req, res) {
  const sgMail = require("@sendgrid/mail");

  //Please use the apiKey very carefully, else it will be blocked by the organisation
  const apiKey =
    "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";

  sgMail.setApiKey(apiKey);
  emailId = req.body.emailId;
  emailIds = req.body.emailIds;
  console.log(emailIds);
  if (emailIds === undefined) {
    const msg = {
      to: req.body.emailId,
      from: "test@example.com",
      subject: "email updates",
      text: req.body.emailContent,
      //html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };

    sgMail.send(msg).then((res) => {
      const notification = {
        id: uuid.v1(),
        sender: "admin@uni.sydney.edu.au",
        receiver: req.body.emailId,
        emailContent: req.body.emailContent,
        subject: req.body.subject,
      };

      sgMail
        .send(msg)
        .then((res) => {
          const notification = {
            id: uuid.v1(),
            sender: "test@example.com",
            receiver: req.body.emailId,
            emailContent: req.body.emailContent,
            subject: "email updates",
          };

          Notification.create(notification).then((data) => {});
        })
        .catch((err) => {
          if (err.response.status === 401) {
            console.log(err);
          }
          return error;
        });
      res.send({ message: "Data added to Notifications DB" });
    });
  }
}

function getMails(req, res) {
  console.log(req.body.searchString);
  User.findAll({ where: { role: req.body.searchString } }).then((resp) => {
    res.send(resp);
  });
}
