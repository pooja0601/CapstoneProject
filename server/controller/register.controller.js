// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const db = require("../models");
const Reference = db.users;
module.exports = function (app) {
  app.post("/api/register", createRegister);
};
process.env.SECRET_KEY = "secret";

//Register
function createRegister(req, res) {
  const reference = {
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    username: req.body.data.username,
    password: req.body.data.password,
    confirmpassword: req.body.data.confirmpassword,
    role: "Client"
  };

  Reference.findOne({
    where:{
      username : req.body.data.username,
    }
  })
    .then((user) => {
      if (!user) {
        if(req.body.data.password == req.body.data.confirmpassword){
        Reference.create(reference)
            .then((user) => {
              res.json({ message: 'Sucessfully Registered!' });
            })
            .catch((err) => {
              res.send('error:' + err);
            });
     
      } else{ 
          res.json({ message: 'Confirm password does not match' }); 
      }
      
    }else {
        res.json({ message: 'User already exists' });
      }
    })
  }



//   {
//     const hash = bcrypt.hashSync(reference.password, 10);
//     reference.password = hash;
//     Reference.create(reference)
//       .then((data) => {
//         let token = jwt.sign(data.dataValues, process.env.SECRET_KEY, {
//           expiresIn: 1440,
//         });
//         res.json({ token: token });
//       })
//       .catch((err) => {
//         res.send("error: " + err);
//       });
//   }

    