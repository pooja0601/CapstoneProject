const dbConfig = require("../../src/app/config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.references = require("./reference.model.js")(sequelize, Sequelize);
db.projects = require("./Client/projects.model.js")(sequelize, Sequelize);
db.notifications = require("./Admin/notifications.model.js")(sequelize,Sequelize);
db.signinusers = require("./register.model.js")(sequelize, Sequelize);
db.indapplys = require("./Student/indApply.model.js")(sequelize, Sequelize);
db.bookslots = require("./slots.model.js")(sequelize, Sequelize);
db.formulas = require("./formula.model.js")(sequelize, Sequelize);
db.marks = require("./marks.model.js")(sequelize, Sequelize);


// db.indapplys.hasMany(db.projects, { foreignKey: "project_id" });
// db.projects.belongsTo(db.indapplys, {
//   foreignKey: "project_id",
//   targetKey: "project_id",
// });

db.approved_projects = require("./approverProjects.model")(
  sequelize,
  Sequelize
);
db.groups = require("./groups-model")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
//sequelize.query("INSERT INTO" + db.marks + "(Student_id) SELECT username FROM" + db.users, {
//  type: Sequelize.QueryTypes.SELECT
//}).then(function (results) {
//  console.log(results) // or do whatever you want
//});
// db.sequelize.sync();
module.exports = db;
