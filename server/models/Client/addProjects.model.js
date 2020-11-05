module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    supervisor: {
      type: Sequelize.STRING,
    },
    mode: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  return Client;
};
