module.exports = (sequelize, Sequelize) => {
  const Marks = sequelize.define("mark", {
    Student_id: {
      type: Sequelize.STRING,
      unique: true,
    },
    Individual_report_3: {
      type: Sequelize.FLOAT
    },
    Individual_report_4: {
      type: Sequelize.FLOAT
    },
    Individual_report_5: {
      type: Sequelize.FLOAT
    },
    Individual_report_6: {
      type: Sequelize.FLOAT
    },
    Individual_report_7: {
      type: Sequelize.FLOAT
    },
    Individual_report_8: {
      type: Sequelize.FLOAT
    },
    Individual_report_9: {
      type: Sequelize.FLOAT
    },
    Individual_report_10: {
      type: Sequelize.FLOAT
    },
    Individual_report_11: {
      type: Sequelize.FLOAT
    },
    Individual_report_12: {
      type: Sequelize.FLOAT
    },
    Individual_report_13: {
      type: Sequelize.FLOAT
    },
    Total_Ind1: {
      type: Sequelize.FLOAT

    },
    Total_Ind2:{
      type: Sequelize.FLOAT

     },
    Total_Ind3:{
      type: Sequelize.FLOAT

     },
    Group_Progress_5: {
      type: Sequelize.FLOAT
    },
    Group_Progress_9: {
      type: Sequelize.FLOAT
    },
    Final_Group_13: {
      type: Sequelize.INTEGER
    },
    Group_Presentation: {
      type: Sequelize.FLOAT
    },
    Final_mark: {
      type: Sequelize.FLOAT
    }
  },  { timestamps: false });
  

  return Marks;
};
