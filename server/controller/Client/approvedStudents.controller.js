const dbConfig = require("../../../src/app/config/db.config");
const db = require("../../models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const Project = db.projects;
const Group = db.groups;
const IndApply = db.indapplys;
module.exports = function (app) {
  app.post("/api/client/getApprovedGroups", getApprovedGroups);
  app.post("/api/Client/getApprovedInds", getApprovedInds);
  app.post("/api/client/getApprovedStudents", getAllStudents);
  // app.post("/api/client/sendFeedback", sendFeedback);
  // app.post("/api/client/getFeedback", getFeedback);
  app.post("/api/client/sendGroupFeedback", sendGroupFeedback);
  app.post("/api/client/sendIndFeedback", sendIndFeedback);
};

let groupProjects = [];
let groupTitles;
async function getApprovedGroups(req, res) {
  const replacements = {
    mode: req.body.mode,
    clientId: req.body.cid,
  };
  const query = `select * from cms.projects  inner join cms.groups  on cms.groups.project_id = cms.projects.project_id where cms.groups.isPublished = 1
  and cms.projects.mode =:mode and cms.projects.clientId=:clientId`;
  const approvedGroups = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    replacements,
  });

  // console.log("approvedGroups", approvedGroups);
  res.send(approvedGroups);
}

async function getApprovedInds(req, res) {
  const replacements = {
    mode: req.body.mode,
    clientId: req.body.cid,
  };

  const query = `select * from cms.projects  
  inner join cms.indapplies  on cms.indapplies.project_id = cms.projects.project_id 
  where cms.projects.isAssigned = 1
  and cms.indapplies.status = 'Accepted' 
  and cms.projects.mode = :mode
  and cms.projects.clientId = :clientId;
  `;

  const approvedInds = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    replacements,
  });

  // console.log("approvedInds", approvedInds);
  res.send(approvedInds);
}

async function getAllStudents(req, res) {
  const replacements = {
    mode: req.body.mode,
    clientId: req.body.cid,
  };

  const query = `select * from cms.projects  inner join cms.groups  on cms.groups.project_id = cms.projects.project_id where cms.groups.isPublished = 1
  and cms.projects.mode ="group" and cms.projects.clientId=:clientId`;
  const approvedGroups = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    replacements,
  });
  // console.log("approvedGroups", approvedGroups);

  const query1 = `select * from cms.projects  
  inner join cms.indapplies  on cms.indapplies.project_id = cms.projects.project_id 
  where cms.projects.isAssigned = 1
  and cms.indapplies.status = 'Accepted' 
  and cms.projects.mode = "individual"
  and cms.projects.clientId = :clientId;
  `;

  const approvedInds = await sequelize.query(query1, {
    type: Sequelize.QueryTypes.SELECT,
    replacements,
  });

  // console.log("approvedInds", approvedInds);

  const all = approvedGroups;
  approvedInds.forEach((ind) => {
    all.push(ind);
  });
  // console.log(all);
  res.send(all);
}

// async function sendFeedback(req, res) {
//   url = req.body.url;
//   data = req.body.data;
//   await Project.update({ feedback: data }, { where: { project_id: url } }).then(
//     (data) => {
//       // console.log("datadata", data.values);
//       res.send(data);
//     }
//   );
// }
// async function getFeedback(req, res) {
//   url = req.body.url;
//   await Project.findAll({ where: { project_id: url } }).then((data) => {
//     console.log("dataaaaaaaaaaaaaaaa", data);
//     res.send(data);
//   });
// }
async function sendGroupFeedback(req, res) {
  url = req.body.url;
  data = req.body.data;
  console.log(url, data);
  // await Group.update({ feedback: data }, { where: { project_id: url } }).then(
  //   (data) => {
  //     console.log(data);
  //   }
  // );
  await Group.update({ feedback: data }, { where: { group_name: url } }).then(
    (data) => {
      console.log("datadata", data);
      // res.send(data);
    }
  );
}
async function sendIndFeedback(req, res) {
  url = req.body.url;
  data = req.body.data;
  console.log(url, data);
  await IndApply.update(
    { feedback: data },
    { where: { project_id: url } }
  ).then((data) => {
    console.log(data);
    // res.send(data);
  });
}
