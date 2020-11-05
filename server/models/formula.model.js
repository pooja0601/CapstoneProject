module.exports = (sequelize, Sequelize) => {
  const Formula = sequelize.define(
    "formula",
    {
      Project_Proposal_Weight: {
        type: Sequelize.INTEGER,
      },
      Progress_Report_Weight: {
        type: Sequelize.INTEGER,
      },
      Final_Report_Weight: {
        type: Sequelize.INTEGER,
      },
      Presentation_Weight: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { timestamps: false }
  );

  return Formula;
};
