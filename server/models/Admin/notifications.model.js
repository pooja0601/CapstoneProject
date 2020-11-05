module.exports = (sequelize, Sequelize) => {
  const Reference = sequelize.define("notification", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    sender: {
      type: Sequelize.STRING,
    },
    receiver: {
      type: Sequelize.STRING,
    },
    emailContent: {
      type: Sequelize.TEXT,
    },
    subject: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  return Reference;
};
