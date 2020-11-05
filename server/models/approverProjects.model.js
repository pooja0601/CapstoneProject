module.exports = (sequelize, Sequelize) => {
    const Approved_Project = sequelize.define("approved_projects", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  
    project_id: {
        type: Sequelize.STRING,
    },
  
    unit: {
        type: Sequelize.STRING,
    },
  
    project_title: {
        type: Sequelize.STRING,
    },
   
  
  },
  {timestamps: false });
  
    return Approved_Project;
  };
  