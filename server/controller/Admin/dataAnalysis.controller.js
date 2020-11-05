const db = require("../../models");
const Project = db.projects;
const Sequelize = require("sequelize");
const dbConfig = require("../../../src/app/config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
module.exports = function (app) {
  app.post("/api/admin/getProjectTypes", getProjectTypes);
  app.post("/api/admin/getStatus", getStatus);
  app.post("/api/admin/getStudents", getStudents);
  app.post("/api/admin/getSlots", getSlots);
};

async function getProjectTypes(req, res) {
  const query = `SELECT type, COUNT(type) as count FROM cms.projects GROUP BY type`;
  const types = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    //   replacements,
  });
  // console.log(types);
  res.send(types);
}

async function getStatus(req, res) {
  const query =
    "select status,count(status) as count from cms.projects group by status";
  const status = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // console.log(status);
  res.send(status);
}
async function getStudents(req, res) {
  const query =
    "select course, count(course) as count from cms.users where role='student' group by course";
  const students = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // console.log(students);
  res.send(students);
}
async function getSlots(req, res) {
  slotsdata = [];
  const query =
    "select count(*) as bookedslots from cms.bookslots where group_name is not null;";
  const bookedSlots = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // console.log("slots", bookedSlots);
  const queryEmpty =
    "select count(*) as emptyslots from cms.bookslots where group_name is null;";
  const emptySlots = await sequelize.query(queryEmpty, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // console.log(bookedSlots, emptySlots);
  slotsdata.push(bookedSlots);
  slotsdata.push(emptySlots);
  // console.log(slotsdata);
  res.send(slotsdata);
  // res.send(emptySlots);
}
