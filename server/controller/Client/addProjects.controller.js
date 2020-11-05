const db = require("../../models");
const Project = db.projects;
const Op = db.Sequelize.Op;
// var uuid = require("uuid");

module.exports = function (app) {
  app.post("/api/createProject", createProject);
  app.post("/api/getAllProjects", getAllProjects);
  app.post("/api/getProjectId", getProjectId);
  app.post("/api/updateProject", updateProject);
  app.post("/api/getClientProjects", getClientProjects);
  app.post("/api/deleteClientProject", deleteClientProject);
};

async function createProject(req, res) {
  const {
    title,
    description,
    functionalities,
    mode,
    groupNo,
    type,
    contacts,
  } = req.body.data;
  const clientId = req.body.clientId;
  const skills = req.body.skills;
  const requirementSkills = [];
  const supervisorNames = [];
  const supervisorEmails = [];

  contacts.forEach((supervisor) => {
    supervisorNames.push(supervisor.name);
    supervisorEmails.push(supervisor.value);
  });

  skills.forEach((skill) => {
    requirementSkills.push(skill.name);
  });

  const project = {
    clientId,
    title,
    description,
    functionalities,
    mode,
    groupNo,
    type: type.toString(),
    requirementSkills: requirementSkills.toString(),
    supervisorNames: supervisorNames.toString(),
    supervisorEmails: supervisorEmails.toString(),
  };

  if (mode === "both") {
    // console.log(mode);
    var addMode = ["individual", "group"];
    addMode.forEach(async (projectMode) => {
      const project1 = {
        //  id: uuid.v1(),
        clientId,
        title,
        description,
        functionalities,
        mode: projectMode,
        groupNo,
        type: type.toString(),
        requirementSkills: requirementSkills.toString(),
        supervisorNames: supervisorNames.toString(),
        supervisorEmails: supervisorEmails.toString(),
      };
      const newProject = await Project.create(project1).catch((err) =>
        console.log(err)
      );
      res.send(newProject);
    });
  } else {
    // console.log("not both", project);
    const notBothProject = await Project.create(project).catch((err) =>
      console.log(err)
    );
    res.send(notBothProject);
  }
}

function getAllProjects(req, res) {
  Project.findAll().then((data) => {
    res.send(data);
  });
}

async function getClientProjects(req, res) {
  const id = req.body.clientId;
  // console.log(id);

  await Project.findAll({
    where: {
      clientId: id,
    },
  }).then((data) => {
    // console.log(data);
    res.send(data);
  });
}
async function deleteClientProject(req, res) {
  const clientId = req.body.clientId;
  const projectId = req.body.projectId;
  await Project.destroy({
    where: {
      id: projectId,
      clientId: clientId,
    },
  });
  // res.send(data);
}
function getProjectId(req, res) {
  const id = req.body.data;
  Project.findByPk(id).then((data) => {
    res.send(data);
  });
}

function updateProject(req, res) {
  const {
    title,
    description,
    functionalities,
    mode,
    groupNo,
    type,
    contacts,
  } = req.body.data;
  const skills = req.body.skills;
  const requirementSkills = [];
  const supervisorNames = [];
  const supervisorEmails = [];

  contacts.forEach((supervisor) => {
    supervisorNames.push(supervisor.name);
    supervisorEmails.push(supervisor.value);
  });

  skills.forEach((skill) => {
    requirementSkills.push(skill.name);
  });

  const project = {
    title,
    description,
    functionalities,
    mode,
    groupNo,
    type: type.toString(),
    requirementSkills: requirementSkills.toString(),
    supervisorNames: supervisorNames.toString(),
    supervisorEmails: supervisorEmails.toString(),
  };

  // console.log(project);
  Project.update(project, { where: { id: req.body.id } }).then((data) => {
    res.send(data);
  });
}

// function findReference (req,res) {
//   console.log("inside findreference");
//  // console.log(req.query.username);

//   const username = req.query.username;
//   var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

//   Reference.findAll({where: condition})
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving tutorials."
//     });
//   });

// }
