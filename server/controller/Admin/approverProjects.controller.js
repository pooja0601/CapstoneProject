const db = require("../../models");
const Project = db.projects;
//const Op = db.Sequelize.Op;

module.exports = function (app) {
  app.post("/api/getGroupProjects", getGroupProjects);
};

function getGroupProjects(req, res) {
  Project.findAll({
    where: {
      unitCode: "COMP5703",
      status: "Approved",
    },
  }).then((data) => {
    res.send(data);
  });
}
