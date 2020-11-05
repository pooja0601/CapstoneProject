const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
var router = require("./router/router");
var cors = require("cors");

const app = express();
const db = require("./models");
db.sequelize.sync();

const errorHandler = require('./_helpers/error-handler');

//dotenv.config();

app.use(bodyParser.json({}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const appPath = path.join(__dirname, "..", "dist");
app.use(express.static(appPath));


// api routes
app.use('/users', require('./users/users.controller'));

app.post("/api/test", async (req, res) => {
  console.log("Connected");
  return res.send({ message: "Back" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(appPath, "index.html"));
});



// global error handler
app.use(errorHandler);

router(app);


const port = 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Application listening to port ${port}`);
});
