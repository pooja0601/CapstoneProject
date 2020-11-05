module.exports = (sequelize, Sequelize) => {
  const bookslot = sequelize.define("bookslot", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    session_date: {
      type: Sequelize.DATEONLY,
    },

    session_starttime: {
      type: Sequelize.STRING,
    },

    session_endtime: {
      type: Sequelize.STRING,
    },

    session_location: {
      type: Sequelize.STRING,
    },

    group_name: {
      type: Sequelize.STRING,
    },
  });

  return bookslot;
};
