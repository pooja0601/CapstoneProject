const multer = require("multer");
const upload = multer({ dest: "tmp/uploads" });

var fs = require("fs");
const db = require("../../models");
const IndApply = db.indapplys;
const Project = db.projects;

module.exports = function (app) {
  app.post(
    "/student/:studentId/project/:projectId/uploadCv",
    upload.single("file"),
    uploadCV
  );
  app.post("/api/student/verifyStudent", verifyStudent);
  // app.post("/api/getStudents", retrieveStudents);
  // app.post("/api/student/getUploadedFiles", retrieveCV);
};
function uploadCV(req, res) {
  console.log("req.params", req.params);
  console.log(`Application for upload cv`);
  console.log("req.file.path", req.file.path);
  console.log("req.file", req.file);
  const path = require("path");

  var studentData = fs.readFileSync(path.join(req.file.path));
  IndApply.create({
    sid: req.params.studentId,
    project_id: req.params.projectId,
    filename: req.file.originalname,
    cv: studentData,
    status: "Applied",
  }).then((indapply) => {
    res.send({ message: "uploaded file successfully" });
  });
}

function verifyStudent(req, res) {
  console.log(req.body);
  IndApply.findAll({ where: { sid: req.body.studentId } }).then((data) => {
    res.send(data);
  });
}

// function retrieveCV(req, res) {
//   projectIds = req.body.projectIds;
//   console.log("inside retrieve", projectIds);
//   IndApply.findAll({ where: { pid: projectIds } }).then((data) => {
//     res.send(data);
//   });
// }

// async function retrieveStudents(req, res) {
//   const clientId = req.body.data;
//   var indProjectId;
//   var projectIds = [];
//   await IndApply.findAll({ attributes: ["pid"] }).then((data) => {
//     console.log(
//       "data",
//       data.map((d) => d.pid)
//     );
//     indProjectId = data.map((d) => d.pid);
//     console.log(indProjectId);
//   });

//   Project.findAll({
//     where: {
//       id: indProjectId,
//       clientId: clientId,
//     },
//   }).then((data) => {
//     res.send(data);
//   });
// }
