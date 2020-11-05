//const db = require("../models");
//const usersdb = db.users;

var mysql = require("mysql");
//const app = express();

function getUnassignedStudents(req, res) {
  const fileRows = [];

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cms",
  });

  // open the connection
  connection.connect((error) => {
    if (error) {
      console.error(error);
    } else {
      let query =
        "SELECT username FROM cms.users AS a WHERE course = 'COMP5703' AND NOT EXISTS (SELECT student_one, student_two, student_three, student_four, student_five FROM cms.groups AS b WHERE a.username=b.student_one OR a.username = b.student_two OR a.username=b.student_three OR a.username=b.student_four OR a.username=b.student_five);";
      connection.query(query, [fileRows], (error, response) => {
        if (error) throw error;

        response = JSON.stringify(response);

        var unassidnedStud = [];

        for (var i = 0; i < response.length; i++) {
          var currentStu = response[i];
          var stdId = currentStu.id;
          unassidnedStud.push(stdId);
        }
        console.log(error || response);
        //return response;
        res.send(response);
      });
    }
  });
}

module.exports = function (app) {
  app.post("/api/getUnassignedStudents", getUnassignedStudents);
};
