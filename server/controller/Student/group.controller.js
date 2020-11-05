const db = require("../../models");
const Group = db.groups;
const { Op } = require("sequelize");

module.exports = function (app) {
  app.post("/api/student/getGroups", getProjects);
  app.post("/api/student/getGroup", getGroups);
  app.post("/api/student/joinGroup", joinGroup);
  app.post("/api/student/leaveGroup", leaveGroup);
  // app.post("/api/student/getUploadedFiles", retrieveCV);
};
function getProjects(req, res) {
  // console.log(req.body.projectId);
  Group.findAll({
    where: {
      project_id: req.body.projectId,
    },
  }).then((data) => {
    res.send(data);
  });
}

function getGroups(req, res) {
  Group.findAll({
    where: {
      group_name: req.body.group_name,
      project_id: req.body.projectId,
    },
  }).then((data) => {
    res.send(data);
  });
}

function joinGroup(req, res) {
  var rawData;

  Group.findAll({ where: { group_name: req.body.groupName } })
    .then((data) => {
      rawData = data.map((d) => d.dataValues).pop();
    })
    .then((data) => {
      if (
        rawData.student_one === req.body.name ||
        rawData.student_two === req.body.name ||
        rawData.student_three === req.body.name ||
        rawData.student_four === req.body.name ||
        rawData.student_five === req.body.name
      ) {
        res.send({ message: "Student already present" });
      } else {
        if (rawData.student_one === null) {
          saveStudent("student_one", req.body.name, req.body.groupName);
          res.send({ message: "student one joined group successfully" });
        } else if (rawData.student_two === null) {
          saveStudent("student_two", req.body.name, req.body.groupName);
          res.send({ message: "student two joined group successfully" });
        } else if (rawData.student_three === null) {
          saveStudent("student_three", req.body.name, req.body.groupName);
          res.send({ message: "student three joined group successfully" });
        } else if (rawData.student_four === null) {
          saveStudent("student_four", req.body.name, req.body.groupName);
          res.send({ message: "student four joined group successfully" });
        } else if (rawData.student_five === null) {
          saveStudent("student_five", req.body.name, req.body.groupName);
          res.send({ message: "student five joined group successfully" });
        }
      }
    });
}

function saveStudent(student, name, groupName) {
  switch (student) {
    case "student_one":
      const group1 = {
        student_one: name,
      };
      Group.update(group1, {
        where: { group_name: groupName },
      }).then((data) => {
        // console.log(data);
      });
      break;
    case "student_two":
      const group2 = {
        student_two: name,
      };
      Group.update(group2, {
        where: { group_name: groupName },
      }).then((data) => {
        // console.log(data);
      });
      break;
    case "student_three":
      const group3 = {
        student_three: name,
      };
      Group.update(group3, {
        where: { group_name: groupName },
      }).then((data) => {
        // console.log(data);
      });
      break;
    case "student_four":
      const group4 = {
        student_four: name,
      };
      Group.update(group4, {
        where: { group_name: groupName },
      }).then((data) => {
        // console.log(data);
      });
      break;
    case "student_five":
      const group5 = {
        student_five: name,
      };
      Group.update(group5, {
        where: { group_name: groupName },
      }).then((data) => {
        // console.log(data);
      });
      break;
  }
}

function leaveGroup(req, res) {
  // console.log(req.body);

  Group.findAll({
    where: {
      group_name: req.body.group_name,
    },
  }).then((data) => {
    var test = data
      .map(
        (d) =>
          d.student_one +
          "," +
          d.student_two +
          "," +
          d.student_three +
          "," +
          d.student_four +
          "," +
          d.student_five
      )
      .pop();
    // console.log(test);
    var testArr = test.split(",");
    var count = 0;
    testArr.forEach((test) => {
      count = count + 1;
      if (test === req.body.name) {
        // console.log(count);
        switch (count) {
          case 1:
            Group.update(
              { student_one: null },
              {
                where: { group_name: req.body.group_name },
              }
            );
            res.send({ message: "student deleted" });
            break;
          case 2:
            Group.update(
              { student_two: null },
              {
                where: { group_name: req.body.group_name },
              }
            );
            res.send({ message: "student deleted" });
            break;

          case 3:
            Group.update(
              { student_three: null },
              {
                where: { group_name: req.body.group_name },
              }
            );
            res.send({ message: "student deleted" });
            break;

          case 4:
            Group.update(
              { student_four: null },
              {
                where: { group_name: req.body.group_name },
              }
            );
            res.send({ message: "student deleted" });
            break;
          case 5:
            Group.update(
              { student_five: null },
              {
                where: { group_name: req.body.group_name },
              }
            );
            res.send({ message: "student deleted" });
            break;
        }
      }
    });

    //)//;
    // res.send(data);
  });
}
