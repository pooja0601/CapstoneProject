const db = require("../../models");
const Notification = db.notifications;

module.exports = function (app) {
  app.post("/api/getNotifications", getNotification);
};

function getNotification(req, res) {
  console.log(req.body.emailId);

  Notification.findAll({ where: { receiver: req.body.emailId } }).then(
    (data) => {
      if (data !== undefined) {
        res.send(data);
      }
    }
  );
}
