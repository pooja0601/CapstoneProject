const dbConfig = require("../../../src/app/config/db.config");
//const db = require("../../models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const db = require("../../models");
const Client = db.clients;
const Op = db.Sequelize.Op;
const Formula = db.formulas;
const Project = db.projects;
const Marks = db.marks;
const Users = db.users;
const Groups = db.groups;

module.exports = function (app) {
  app.post("/api/AdminViewProjects", viewProjects);
  app.post("/api/approveProject", ApproveProject);
  app.post("/api/rejectProject", RejectProject);
  app.post("/api/createFormula", createFormula);
  app.post("/api/calculateMark", calculateMark);
  app.post("/api/viewFormula", viewFormula);
  app.post("/api/ListOfApprovedProjects", ListOfApprovedProjects);
  app.post("/api/getStudentsProjects", getStudentsProjects);
  app.post("/api/getProjectsForEdit", getProjects);
  app.post("/api/updateProjectlist", createProject);
  app.post("/api/AdminUpdateProject", updateProject);
  app.post("/api/AdmindeleteProject", deleteProject);
  app.post("/api/ViewStudentsMarks", getStudentsMarks);
  app.post("/api/getProjectsforId", getProjectsforId);
  app.post("/api/getstudentmark", getstudentmark);
  app.post("/api/CloneProject", CloneProject);
  app.post("/api/simulateMark", simulateMark);
  app.post("/api/CountGroups", CountGroups);
};

//get number of groups
function CountGroups(req, res) {
  Groups.findAndCountAll({
    project_id: "CS67",
  }).then((data) => {
    res.send(data);
  });
}

//Clone Project
function CloneProject(req, res) {
  project_id = req.body.id;
  console.log(project_id);
  Project.findOne({
    //<---------- 1
    where: { id: project_id },
    raw: true,
  }).then((data) => {
    delete data.id; //<---------- 2
    Project.create(data); //<---------- 3
  });
}
//get student mark
function getstudentmark(req, res) {
  //Student_id
  const id = req.body.data;
  //console.log(id);
  Marks.findAll({
    where: {
      //  mode: "Group",
      Student_id: id,
    },
  }).then((data) => {
    res.send(data);
  });
}
//var projectNumber = 1;
//getProjectsforId
function getProjectsforId(req, res) {
  const type = req.body.data;
  console.log(type);
  if (type == "All") {
    Project.findAll().then((data) => {
      res.send(data);
    });
  } else {
    Project.findAll({
      where: {
        type: type,
      },
    }).then((data) => {
      res.send(data);
    });
  }
}

//View students marks
function getStudentsMarks(req, res) {
  sequelize
    .query(
      "insert into cms.marks (student_id) select username from cms.users where cms.users.role = 'student' and not exists (select student_id from   cms.marks where  cms.users.username = cms.marks.student_id)",
      null,
      { raw: true }
    )
    .then(function (data) {
      //  console.log(data);
    });
  //sequelize.query("insert into pm.marks (student_id) select username from pm.users where pm.users.role = 'student' and not exists (select student_id from   pm.marks where  pm.users.username = pm.marks.student_id)", {
  //  type: sequelize.querytypes.select
  //}).then(function (results) {
  //  console.log(results) // or do whatever you want
  //});
  Marks.findAll().then((data) => {
    console.log(data);
    res.send(data);
  });
}
//updateproject
function updateProject(req, res) {
  const {
    title,
    type,
    project_id,
    unitCode,
    groupNo,
    description,
    functionalities,
    requirementSkills,
    supervisorNames,
    supervisorEmails,
  } = req.body.data;
  const id = req.body.id;
  //if (groupNo == "") { groupNo = 4;}
  const project = {
    title,
    type: type.toString(),
    unitCode,
    groupNo,
    description,
    functionalities,
    requirementSkills,
    supervisorNames,
    supervisorEmails,
    project_id,
  };
  Project.update(project, { where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("error:" + err);
    });
}
//add or update project
function createProject(req, res) {
  const { title, description, supervisior, mode } = req.body.data;

  const project = {
    title,
    description,
    supervisiorNames,
    mode,
  };

  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
//get projects to edit
function getProjects(req, res) {
  const id = req.body.data;
  Project.findByPk(id).then((data) => {
    res.send(data);
  });
}

//show lists of Approved projects
function ListOfApprovedProjects(req, res) {
  Formula.findAll({
    mode: "Approved",
  }).then((data) => {
    res.send(data);
  });
}
//show formula
function viewFormula(req, res) {
  Formula.findAll().then((data) => {
    res.send(data);
  });
}
//Calculate mark
function calculateMark(req, res) {
  console.log("Calculate Mark");
  const id = 1;
  var finalMark;
  var student_id = req.body.id;
  var IndReport3;
  var IndReport4;
  var IndReport5;
  var IndReport6;
  var IndReport7;
  var IndReport8;
  var IndReport9;
  var IndReport10;
  var IndReport11;
  var IndReport12;
  var IndReport13;
  var GroupProgress9;
  var FinalGroup13;
  var Group_Presentation,
    IndReport3 = parseFloat(req.body.data.IndReport3);
  console.log(IndReport3);
  IndReport4 = parseFloat(req.body.data.IndReport4);
  IndReport5 = parseFloat(req.body.data.IndReport5);
  GroupProposal5 = parseFloat(req.body.data.GroupProposal5);
  IndReport6 = parseFloat(req.body.data.IndReport6);
  IndReport7 = parseFloat(req.body.data.IndReport7);
  IndReport8 = parseFloat(req.body.data.IndReport8);
  IndReport9 = parseFloat(req.body.data.IndReport9);
  IndReport10 = parseFloat(req.body.data.IndReport10);
  IndReport11 = parseFloat(req.body.data.IndReport11);
  IndReport12 = parseFloat(req.body.data.IndReport12);
  IndReport13 = parseFloat(req.body.data.IndReport13);
  GroupProgress9 = parseFloat(req.body.data.GroupProgress9);
  FinalGroup13 = parseFloat(req.body.data.FinalGroup13);
  Group_Presentation = parseFloat(req.body.data.Group_Presentation);
  if (req.body.data.IndReport3 == null) {
    IndReport3 = 0;
  }
  if (req.body.data.IndReport4 == null) {
    IndReport4 = 0;
  }
  if (req.body.data.IndReport5 == null) {
    IndReport5 = 0;
  }
  if (req.body.data.GroupProposal5 == null) {
    GroupProposal5 = 0;
  }
  if (req.body.data.IndReport6 == null) {
    IndReport6 = 0;
  }
  if (req.body.data.IndReport7 == null) {
    IndReport7 = 0;
  }
  if (req.body.data.IndReport8 == null) {
    IndReport8 = 0;
  }
  if (req.body.data.IndReport9 == null) {
    IndReport9 = 0;
  }
  if (req.body.data.IndReport10 == null) {
    IndReport10 = 0;
  }
  if (req.body.data.IndReport11 == null) {
    IndReport11 = 0;
  }
  if (req.body.data.IndReport12 == null) {
    IndReport12 = 0;
  }
  if (req.body.data.IndReport13 == null) {
    IndReport13 = 0;
  }
  if (req.body.data.GroupProgress9 == null) {
    GroupProgress9 = 0;
  }
  if (req.body.data.FinalGroup13 == null) {
    FinalGroup13 = 0;
  }
  if (req.body.data.Group_Presentation == null) {
    Group_Presentation = 0;
  }
  Formula.findAll({
    attributes: [
      "Project_Proposal_Weight",
      "Progress_Report_Weight",
      "Final_Report_Weight",
      "Presentation_Weight",
    ],
    where: { id: id },
  }).then(function (formula) {
    console.log(formula);
    const Project_Proposal_Weight = formula[0]["Project_Proposal_Weight"];
    const Progress_Report_Weight = formula[0]["Progress_Report_Weight"];
    const Final_Report_Weight = formula[0]["Final_Report_Weight"];
    const Presentation_Weight = formula[0]["Presentation_Weight"];
    const ProjectProposasl =
      (IndReport3 + IndReport4 + IndReport5) *
      0.01 *
      (GroupProposal5 * 0.01) *
      Project_Proposal_Weight;
    const ProgressReport =
      (IndReport6 + IndReport7 + IndReport8) *
      0.01 *
      (GroupProgress9 * 0.01) *
      Progress_Report_Weight;
    const FinalReport =
      (IndReport9 + IndReport10 + IndReport11 + IndReport12 + IndReport13) *
      0.01 *
      (FinalGroup13 * 0.01) *
      Final_Report_Weight;
    const GroupPresentation = Group_Presentation * 0.01 * Presentation_Weight;
    const FinalTotalMark =
      ProjectProposasl + ProgressReport + FinalReport + GroupPresentation;
    finalMark = FinalTotalMark;
    console.log(ProjectProposasl);
    console.log(ProgressReport);
    console.log(FinalReport);
    console.log(GroupPresentation);
    console.log(FinalTotalMark);
    console.log(finalMark);
    Marks.update(
      {
        //console.log("finalMark", finalMark);

        Individual_report_3: req.body.data.IndReport3,
        Individual_report_4: req.body.data.IndReport4,
        Individual_report_5: req.body.data.IndReport5,
        Individual_report_6: req.body.data.IndReport6,
        Individual_report_7: req.body.data.IndReport7,
        Individual_report_8: req.body.data.IndReport8,
        Individual_report_9: req.body.data.IndReport9,
        Individual_report_10: req.body.data.IndReport10,
        Individual_report_11: req.body.data.IndReport11,
        Individual_report_12: req.body.data.IndReport12,
        Individual_report_13: req.body.data.IndReport13,
        Group_Progress_5: req.body.data.GroupProposal5,
        Group_Progress_9: req.body.data.GroupProgress9,
        Final_Group_13: req.body.data.FinalGroup13,
        Final_mark: parseFloat(FinalTotalMark),
        Group_Presentation: req.body.data.Group_Presentation,
        Total_Ind1: IndReport3 + IndReport4 + IndReport5,
        Total_Ind2: IndReport6 + IndReport7 + IndReport8,
        Total_Ind3:
          IndReport9 + IndReport10 + IndReport11 + IndReport12 + IndReport13,
      },
      { returning: true, where: { Student_id: student_id } }
    );
    // const project_Proposal = req.body.data.
    //console.log(Project_Proposal_Weight)
    // project will be an instance of Project and stores the content of the table entry
    // with id 123. if such an entry is not defined you will get null
  });

  //res.send({ ProjectProposasl: ProjectProposasl }, { ProgressReport: ProgressReport }, { FinalReport: FinalReport }, { GroupPresentation: GroupPresentation }, { FinalTotalMark: FinalTotalMark });
  // res.send({ message: tosFinalTotalMark });
}
function simulateMark(req, res) {
  console.log("Calculate Mark");
  const id = 1;
  var finalMark;
  // var student_id = req.body.id;
  var IndReport3;
  var IndReport4;
  var IndReport5;
  var IndReport6;
  var IndReport7;
  var IndReport8;
  var IndReport9;
  var IndReport10;
  var IndReport11;
  var IndReport12;
  var IndReport13;
  var GroupProgress9;
  var FinalGroup13;
  var Group_Presentation,
    IndReport3 = parseFloat(req.body.data.IndReport3);
  console.log(IndReport3);
  IndReport4 = parseFloat(req.body.data.IndReport4);
  IndReport5 = parseFloat(req.body.data.IndReport5);
  GroupProposal5 = parseFloat(req.body.data.GroupProposal5);
  IndReport6 = parseFloat(req.body.data.IndReport6);
  IndReport7 = parseFloat(req.body.data.IndReport7);
  IndReport8 = parseFloat(req.body.data.IndReport8);
  IndReport9 = parseFloat(req.body.data.IndReport9);
  IndReport10 = parseFloat(req.body.data.IndReport10);
  IndReport11 = parseFloat(req.body.data.IndReport11);
  IndReport12 = parseFloat(req.body.data.IndReport12);
  IndReport13 = parseFloat(req.body.data.IndReport13);
  GroupProgress9 = parseFloat(req.body.data.GroupProgress9);
  FinalGroup13 = parseFloat(req.body.data.FinalGroup13);
  Group_Presentation = parseFloat(req.body.data.Group_Presentation);
  if (req.body.data.IndReport3 == "") {
    IndReport3 = 0;
  }
  if (req.body.data.IndReport4 == "") {
    IndReport4 = 0;
  }
  if (req.body.data.IndReport5 == "") {
    IndReport5 = 0;
  }
  if (req.body.data.GroupProposal5 == "") {
    GroupProposal5 = 0;
  }
  if (req.body.data.IndReport6 == "") {
    IndReport6 = 0;
  }
  if (req.body.data.IndReport7 == "") {
    IndReport7 = 0;
  }
  if (req.body.data.IndReport8 == "") {
    IndReport8 = 0;
  }
  if (req.body.data.IndReport9 == "") {
    IndReport9 = 0;
  }
  if (req.body.data.IndReport10 == "") {
    IndReport10 = 0;
  }
  if (req.body.data.IndReport11 == "") {
    IndReport11 = 0;
  }
  if (req.body.data.IndReport12 == "") {
    IndReport12 = 0;
  }
  if (req.body.data.IndReport13 == "") {
    IndReport13 = 0;
  }
  if (req.body.data.GroupProgress9 == "") {
    GroupProgress9 = 0;
  }
  if (req.body.data.FinalGroup13 == "") {
    FinalGroup13 = 0;
  }
  if (req.body.data.Group_Presentation == "") {
    Group_Presentation = 0;
  }
  Formula.findAll({
    attributes: [
      "Project_Proposal_Weight",
      "Progress_Report_Weight",
      "Final_Report_Weight",
      "Presentation_Weight",
    ],
    where: { id: id },
  }).then(function (formula) {
    console.log(formula);
    const Project_Proposal_Weight = formula[0]["Project_Proposal_Weight"];
    const Progress_Report_Weight = formula[0]["Progress_Report_Weight"];
    const Final_Report_Weight = formula[0]["Final_Report_Weight"];
    const Presentation_Weight = formula[0]["Presentation_Weight"];
    const ProjectProposasl =
      (IndReport3 + IndReport4 + IndReport5) *
      0.01 *
      (GroupProposal5 * 0.01) *
      Project_Proposal_Weight;
    const ProgressReport =
      (IndReport6 + IndReport7 + IndReport8) *
      0.01 *
      (GroupProgress9 * 0.01) *
      Progress_Report_Weight;
    const FinalReport =
      (IndReport9 + IndReport10 + IndReport11 + IndReport12 + IndReport13) *
      0.01 *
      (FinalGroup13 * 0.01) *
      Final_Report_Weight;
    const GroupPresentation = Group_Presentation * 0.01 * Presentation_Weight;
    const FinalTotalMark =
      ProjectProposasl + ProgressReport + FinalReport + GroupPresentation;
    finalMark = FinalTotalMark;
    console.log(ProjectProposasl);
    console.log(ProgressReport);
    console.log(FinalReport);
    console.log(GroupPresentation);
    console.log(FinalTotalMark);
    console.log(finalMark);
    Marks = finalMark.toString();
    //res.send({Message: Marks});
    // const project_Proposal = req.body.data.
    //console.log(Project_Proposal_Weight)
    // project will be an instance of Project and stores the content of the table entry
    // with id 123. if such an entry is not defined you will get null
  });
}
//Create Formula
function createFormula(req, res) {
  console.log("Update formula!!!!!!!!! :");
  //INSERT INTO pm.marks(id) VALUES(100) ON DUPLICATE KEY UPDATE
  //Final_mark = 20
  //console.log(req.body.id);
  var formuladata = "";
  sequelize
    .query("select * from cms.formulas where id = 1", null, { raw: true })
    .then(function (data) {
      formuladata = data;
    });

  if (formuladata != "") {
    const {
      ProjectProposalWeight,
      ProgressReportWeight,
      FinalReportWeight,
      PresentationWeight,
    } = req.body;
    const formula = {
      id: 1,
      ProjectProposalWeight,
      ProgressReportWeight,
      FinalReportWeight,
      PresentationWeight,
    };
    Formula.create(formula).then((data) => {
      res.send(data);
    });
  } else {
    Formula.update(
      {
        Project_Proposal_Weight: req.body.data.ProjectProposalWeight,
        Progress_Report_Weight: req.body.data.ProgressReportWeight,
        Final_Report_Weight: req.body.data.FinalReportWeight,
        Presentation_Weight: req.body.data.PresentationWeight,
      },
      { returning: true, where: { id: 1 } }
    );
  }
}
//Reject project
function RejectProject(req, res) {
  console.log("Update project!!!!!!!!! :");
  console.log(req.body.id);
  const id = req.body.id;
  const project_id = req.body.project_id;
  Groups.destroy({
    where: {
      project_id: project_id,
    },
  }).then(function (data) {
    console.log(data);
  });
  Project.update(
    { status: "Rejected" },
    { returning: true, where: { id: id } }
  );
}

//Approve project
function ApproveProject(req, res) {
  // console.log("Update project!!!!!!!!! :");
  // console.log("req body!!!!!!!!! :");
  // console.log(req);

  // console.log(req.body.id);
  const id = req.body.id;
  //const Pstatus = req.body.Pstatus;
  // const projectId = "CS" + projectNumber;
  //projectNumber = projectNumber + 1;
  var groupNo = req.body.groupNo;
  const project_id = req.body.project_id;
  const mode = req.body.mode;
  Project.update(
    {
      status: "Approved",
      //   project_id: projectId,
    },
    { returning: true, where: { id: id } }
  );
  Groups.destroy({
    where: {
      project_id: project_id,
    },
  }).then(function (data) {
    console.log(data);
  });
  if (mode == "group") {
    if (!groupNo) {
      groupNo = 4;
    }
    for (i = 0; i < groupNo; i++) {
      console.log("Group is created!");
      var j = i + 1;
      group_name = project_id + "-" + j;
      const group = {
        project_id,
        group_name,
      };

      Groups.create(group)
        .then((data) => {
          res.send(data);
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }
}
//delete project
function deleteProject(req, res) {
  console.log("Deleting project!!!!!!!!! :");
  console.log(req.body.id);
  const id = req.body.id;
  // const Pstatus = req.body.Pstatus;
  // if (Pstatus == "Approved") {
  //   projectNumber = projectNumber - 1;
  // }
  console.log("delete");
  Project.destroy({
    where: {
      id: id,
      //projectName: getProjectInfo.Project_Name
    },
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
function viewProjects(req, res) {
  Project.findAll().then((data) => {
    res.send(data);
  });
}
//get projects for students based on their unit code
function getStudentsProjects(req, res) {
  const course = req.body.course;
  console.log(course);
  if (course == "COMP5703") {
    Project.findAll({
      where: {
        //  mode: "Group",
        status: "Approved",
        unitCode: course,
      },
    }).then((data) => {
      res.send(data);
    });
  } else {
    Project.findAll({
      where: {
        //  mode: "Group",
        status: "Approved",
        unitCode: course,
        isAssigned: 0,
      },
    }).then((data) => {
      res.send(data);
    });
  }
}
