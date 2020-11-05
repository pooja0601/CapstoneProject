const db = require("../models");
const Reference = db.references;

module.exports = function (app) {
  // app.post("/api/checkConnections", createReference);
  app.post("api/");
};

function createReference(req, res) {
  const { username, password } = req.body.data;

  const reference = {
    username,
    password,
  };

  Reference.create(reference).then((data) => {
    res.send(data);
  });

  res.send({ message: "blah blah" });
}
