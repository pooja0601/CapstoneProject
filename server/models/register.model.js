
module.exports = (sequelize, Sequelize) => {
  const SigninUser = sequelize.define("signinusers", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },

  first_name: {
      type: Sequelize.STRING,
  },

  last_name: {
      type: Sequelize.STRING,
  },

  email: {
      type: Sequelize.STRING,
  },

  password: {
      type: Sequelize.STRING,
  },

  createdAt: {
      type: Sequelize.DATE,
      
  },

  updatedAt: {
    type: Sequelize.DATE,
    
  }

});


  return SigninUser;
};
