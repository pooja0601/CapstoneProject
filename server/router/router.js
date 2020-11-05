var referenceController = require("../controller/reference.controller");
var mailSendController = require("../controller/Admin/mail-send.controller");
var addProjectsController = require("../controller/Client/addProjects.controller");
var notificationController = require("../controller/Admin/notifications.controller");
var registerController = require("../controller/register.controller");
var reviewStudentController = require("../controller/Client/reviewStudent.controller");
var pptsessionController = require("../controller/Admin/pptsession.controller");
//var slotsController = require("../controller/Student/slots.controller");
var uploadController = require("../controller/Admin/upload.controller");
var studentUploadCVController = require("../controller/Student/uploadCV.controller");
var studentProjectDetailsController = require("../controller/Student/project.controller");
var rosaProjectController = require("../controller/Admin/rosa-project.controller");

// var individualController = require('../controller/individual.controller');
var approvedProjectsController = require("../controller/Admin/approverProjects.controller");
var addProjectGroups = require("../controller/Admin/addGroups.controller");
// var authorController = require('../controller/author.controller');
var bookingslotController = require("../controller/Student/bookingslot.controller");
var unassignedStudentsController = require("../controller/Admin/unassignedStudents.controller");

//var approvedStudentsController = require("../controller/Client/approvedStudents.controller");
var studentGroupController = require("../controller/Student/group.controller");
var dataAnalysisController = require("../controller/Admin/dataAnalysis.controller");
var approvedStudentsController = require("../controller/Client/approvedStudents.controller");
var profileController = require("../controller/profile.controller");
var adminFeedbackController = require("../controller/Admin/adminFeedback.controller");
module.exports = function (app) {
  referenceController(app);
  profileController(app);

  //Admin
  mailSendController(app);
  notificationController(app);
  addProjectGroups(app);
  approvedProjectsController(app);
  dataAnalysisController(app);
  adminFeedbackController(app);

  pptsessionController(app);
  uploadController(app);
  rosaProjectController(app);
  unassignedStudentsController(app);

  //Client
  addProjectsController(app);
  reviewStudentController(app);
  approvedStudentsController(app);

  //   individualController(app);
  //   authorController(app);

  //Student
  bookingslotController(app);
  studentUploadCVController(app);
  studentProjectDetailsController(app);
  studentGroupController(app);

  //Common
  registerController(app);

  //slotsController(app);
};
