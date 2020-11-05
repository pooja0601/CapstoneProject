const db = require("../models");
const userprofile = db.users;

module.exports = function (app) {
    app.post("/api/profile", profile);
    app.post("/api/resetpassword", resetpassword);
  
  }


//Display user's profile

  function profile(req,res){ 
    var studentid = req.body.studentid;

    userprofile.findAll({
  where:{
    username : studentid,
  }
  }).then((data) => {
    res.send(data);
  });

}

//Change password

function resetpassword(req,res){
var currentpwd = req.body.data.currentpassword
var newpwd = req.body.data.newpassword
var confirmpwd = req.body.data.confirmnewpassword
var username = req.body.username

if(newpwd != confirmpwd){
  console.log("confirm password does not match")
  res.send({message: 'Your confirm password does not match'});

}
else{
userprofile.findAll({attributes: ["username", "password"],
  where:{
    username: req.body.username,
  }
}).then ((data)=> {
  var dbpwd = data.map(d=>d.password)

  if(dbpwd == currentpwd){
    // console.log("pwd matched")
    userprofile.update(
      {password : req.body.data.newpassword},
      {where: { username: req.body.username}}
    )
    res.send({message: 'Your new password has been updated successfully'});
  }
  else{
    // console.log("pwd not matched")
    res.send({message: 'Your current password does not match'});
  }
})
}

}