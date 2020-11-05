module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      firstName: {
        type: Sequelize.STRING,
      },

      lastName: {
        type: Sequelize.STRING,
      },

      role: {
        type: Sequelize.ENUM,
        values: ["Admin", "Client", "Student"],
      },

      course: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        isEmail: true,
      },
      //Semester: {
      //  type: Sequelize.INTEGER,
      //  values: [1, 2],
      //  //defaultValue: 0,
      //},
      //Year: {
      //  type: Sequelize.Year,
      //  //defaultValue: 0,
      //},
    },

    { timestamps: false }
  );
  return User;
};
