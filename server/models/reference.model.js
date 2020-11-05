module.exports = (sequelize, Sequelize) => {
  const Reference = sequelize.define("reference", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Reference;
};
