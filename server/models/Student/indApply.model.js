const ProjectModel = require("../Client/projects.model");

module.exports = (sequelize, Sequelize) => {
  const IndApply = sequelize.define("indapply", {
    sid: {
      type: Sequelize.STRING,
    },
    project_id: {
      type: Sequelize.STRING,
      // references: {
      //   model: ProjectModel,
      //   key: "project_id",
      // },
    },
    filename: {
      type: Sequelize.STRING,
    },
    cv: {
      type: Sequelize.BLOB("long"),
    },
    status: {
      type: Sequelize.STRING,
    },
    feedback: {
      type: Sequelize.JSON,
      defaultValue: null, //because we wanted an array of arrays
      get() {
        return JSON.parse(this.getDataValue("feedback"));
      },
      set(value) {
        this.setDataValue("feedback", JSON.stringify(value));
      },
    },
  });

  return IndApply;
};
