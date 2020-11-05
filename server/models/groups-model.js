module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define(
    "groups",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      project_id: {
        type: Sequelize.STRING,
      },

      group_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      student_one: {
        type: Sequelize.STRING,
      },
      student_two: {
        type: Sequelize.STRING,
      },
      student_three: {
        type: Sequelize.STRING,
      },
      student_four: {
        type: Sequelize.STRING,
      },
      student_five: {
        type: Sequelize.STRING,
      },
      IsPublished: {
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
    },
    { timestamps: false }
  );

  return Group;
};
