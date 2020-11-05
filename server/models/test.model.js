module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("test", {
    Project_Proposal_Weight: {
      type: Sequelize.INTEGER
    },
    Progress_Report_Weight: {
      type: Sequelize.INTEGER
    },
    Final_Report_Weight: {
      type: Sequelize.INTEGER
    },
    Presentation_Weight: {
      type: Sequelize.INTEGER
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Test;
};
