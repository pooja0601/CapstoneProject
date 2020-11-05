"use strict";

const http = require("http");
const fs = require("fs");

const express = require("express");

const multer = require("multer");
const csv = require("fast-csv");

const mysql = require("mysql");

const Router = express.Router;
const upload = multer({ dest: "tmp/csv/" });
//var csvRows = upload.fields([{name: 'file', maxCount:1])
const app = express();
const router = new Router();

router.post("/", upload.single("file"), function (req, res) {
  console.log(`Application for upload csv`);
  console.log("req.file.path", req.file.path);
  console.log("req.file", req.file);

  let stream = fs.createReadStream(req.file.path);
  const fileRows = [];
  console.log(fileRows);
  // open uploaded file
  stream
    .pipe(csv.parse())
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })

    .on("end", function () {
      console.log(fileRows);
      // remove the first line: header
      fileRows.shift();

      // create a new connection to the database
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
            "INSERT INTO users (id, username, password, firstName, lastName, role, course, email) VALUES ?";
          connection.query(query, [fileRows], (error, response) => {
            console.log(error || response);
            fs.unlinkSync(req.file.path); // remove temp file
          });
        }
      });

      //stream.pipe(csvStream);
      //process "fileRows" and respond
    });
});

module.exports = function (app) {
  app.use("/uploadcsv", router);
};
