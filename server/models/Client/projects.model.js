module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    clientId: {
      type: Sequelize.STRING,
    },
    project_id: {
      type: Sequelize.STRING,
      unique: true,
    },
    title: {
      type: Sequelize.TEXT("long"),
    },
    description: {
      type: Sequelize.TEXT("long"),
    },
    functionalities: {
      type: Sequelize.TEXT("long"),
    },
    mode: {
      type: Sequelize.STRING,
    },
    groupNo: {
      type: Sequelize.STRING,
      defaultValue: 4,
    },
    requirementSkills: {
      type: Sequelize.STRING,
    },
    supervisorNames: {
      type: Sequelize.STRING,
    },
    supervisorEmails: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    unitCode: {
      type: Sequelize.STRING,
    },
    IsAssigned: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  return Project;
};
