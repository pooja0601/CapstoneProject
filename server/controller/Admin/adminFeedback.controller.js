const db = require("../../models");
const Project = db.projects;
const Group = db.groups;
const IndApplies = db.indapplys;
module.exports = function (app) {
  app.post("/api/admin/getGroupFeedback", getGroupFeedback);
  app.post("/api/admin/getIndFeedback", getIndfeedback);
};

async function getGroupFeedback(req, res) {
  console.log("inside group feedback");
  await Group.findAll({
    attributes: ["project_id", "group_name", "feedback"],
  }).then((data) => {
    // console.log(data);
    res.send(data);
  });
}

async function getIndfeedback(req, res) {
  await IndApplies.findAll({
    attributes: ["project_id", "feedback"],
  }).then((data) => {
    res.send(data);
  });
}
