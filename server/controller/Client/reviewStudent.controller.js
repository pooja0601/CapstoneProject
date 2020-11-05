const db = require("../../models");
const IndApply = db.indapplys;
const Project = db.projects;
module.exports = function (app) {
  app.post("/api/getProjects", getProjects);
  app.post("/api/student/getUploadedFiles", retrieveCV);
  app.post("/api/studentApprove", studentApprove);
  // app.post("/api/getProjects", getProjects);
};

async function getProjects(req, res) {
  const ipId = req.body.data;
  console.log(ipId);
  var indProjectId;
  var projectIds = [];

  Project.findAll({
    where: {
      project_id: ipId,
    },
  }).then((data) => {
    // console.log(data);
    res.send(data);
  });
}

function retrieveCV(req, res) {
  projectIds = req.body.data;
  IndApply.findAll({ where: { project_id: projectIds } }).then((data) => {
    // console.log("cv data", data);
    res.send(data);
  });
}

function studentApprove(req, res) {
  const studentId = req.body.studid;
  const proId = req.body.cpid;
  IndApply.update(
    { status: "Accepted" },
    { where: { sid: studentId, project_id: proId } }
  )
    .then(
      IndApply.update(
        { status: "Rejected" },
        { where: { project_id: proId, status: "Applied" } }
      )
    )
    .then(Project.update({ IsAssigned: 1 }, { where: { project_id: proId } }));
}
