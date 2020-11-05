const db = require("../../models");
const Groups = db.groups;
const Users = db.users;

module.exports = function (app) {
    app.post("/api/getAllGroups", getAllGroups);
    app.post("/api/getProjectGroups", getProjectGroups);
    app.post("/api/addGroupName", addGroupName);
    app.post("/api/updateGroupName", updateGroupName);
    app.post("/api/deleteGroupName", deleteGroupName);
    app.post("/api/updateGroupStudents", updateStudents);
    app.post("/api/publishStudentGroups", publishGroups);
    app.post("/api/getAllUsers", getAllUsers);
}


function getAllGroups(req, res) {
  Groups.findAll().then((data) => {
    res.send(data);
  });
}

function getProjectGroups(req, res) {
  const pid = req.body.project_id;
  Groups.findAll({
    where: {
      project_id: pid,
    },
  }).then((data) => {
    res.send(data);
  });
}

function addGroupName(req, res) {
  const project_id = req.body.project_id;
  const group_name = req.body.group_name;
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

function updateGroupName(req, res) {
  console.log("Updating group!!!!!!!!! :");
  const id = req.body.id;
  const group_name = req.body.group_name;
  const group = {
    id,
    group_name,
  };
  Groups.update(group, { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function deleteGroupName(req, res) {
  console.log("Deleting group!!!!!!!!! :");
  console.log(req.body.id);
  const id = req.body.id;

  console.log("delete");
  Groups.destroy({
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

function updateStudents(req, res) {
  console.log("Updating students on group!!!!!!!!! :");
  console.log(req.body);
  console.log(req.body.id);
  const id = req.body.id;
  const student_one = req.body.student_one === "" ? null : req.body.student_one;
  const student_two = req.body.student_two === "" ? null : req.body.student_two;
  const student_three =
    req.body.student_three === "" ? null : req.body.student_three;
  const student_four =
    req.body.student_four === "" ? null : req.body.student_four;
  const student_five =
    req.body.student_five === "" ? null : req.body.student_five;
  const group = {
    id,
    student_one,
    student_two,
    student_three,
    student_four,
    student_five,
  };
  Groups.update(group, { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function publishGroups(req, res){
  console.log("Publishing students on group!!!!!!!!! :");
  console.log(req.body);

 

  Groups.update({IsPublished:true}, {where: {} })
  .then((data) => {
    res.send(data);
  })

  .then((res) => console.log(res))
  .catch((err) => console.log(err));

}



function getAllUsers(req, res) {
  Users.findAll().then((data) => {
    res.send(data);
  });
}
