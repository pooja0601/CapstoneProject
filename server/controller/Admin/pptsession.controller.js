const db = require("../../models");
const bookslot = db.bookslots;

module.exports = function(app) {
  app.post("/api/session", createSession);
  app.post("/api/viewsession", viewSession);
  app.post("/api/updatesession", updateSession);
  app.post("/api/getsession", getSession);
  app.post("/api/deletesession", deleteSession);
  
};


//Creating Session
  function createSession(req, res) {
      const {session_date, session_starttime,session_endtime, session_location, group_name} = req.body.data;
    const session = {
        session_date,
        session_starttime,
        session_endtime,
        session_location,
        group_name   
    } 
  
    console.log(session);
    bookslot.create(session)
    .then((data) => {  
      res.send(data);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

//Viewing all the sessions

function viewSession(req, res) {
    bookslot.findAll().then((data) => {
      res.send(data);
    });
  }


//Gettin sessions
function getSession(req, res) {
  const id = req.body.data;
  bookslot.findByPk(id).then((data) => {
    res.send(data);
  });
}

  //Updating session

function updateSession(req, res) {
  const { session_date, session_starttime,session_endtime, session_location}= req.body.data;
  const id = req.body.id;
  var group_name= req.body.data.group_name;
if(group_name == ""){
  group_name = null;
}
  var session = {
    session_date,
    session_starttime,
    session_endtime,
    session_location,
    group_name,
  };
  bookslot.update(session, { where: { id: id } }).then((data) => {
    res.send(data);
  });
}

//Deleting session

async function deleteSession(req,res){
  const id = req.body.id;
  const data = await bookslot.destroy({ 
    where: { id },
   });
   res.send({ message: 'Successfully deleted !' })
}
