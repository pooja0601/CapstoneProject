const db = require("../../models");
const Project = db.projects;

module.exports = function (app) {
  app.post("/api/student/getProjects", getProjects);
  app.post("/api/student/getProject", getProject);
  // app.post("/api/student/getUploadedFiles", retrieveCV);
};
function getProjects(req, res) {
  Project.findAll({
    where: {
      unitCode: req.body.data,
      status: "Approved",
      isAssigned: 0,
    },
  }).then((data) => {
    res.send(data);
  });
}

function getProject(req, res) {
  Project.findAll({
    where: {
      project_id: req.body.data,
      status: "Approved",
    },
  }).then((data) => {
    res.send(data);
  });
}

// function retrieveCV(req, res) {
//   IndApply.findAll().then((data) => {
//     res.send(data);
//   });
// }
