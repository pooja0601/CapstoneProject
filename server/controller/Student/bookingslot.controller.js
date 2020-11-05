const db = require("../../models");
const bookslot = db.bookslots;
const grouptable = db.groups;
const indtable = db.indapplys;
const { Op } = require("sequelize");

module.exports = function (app) {
  //   app.post("/api/session", createSession);
  app.post("/api/bookingslot", bookingSlot);
  app.post("/api/checkgroup", checkGroup);
  app.post("/api/updateslot", updateSlot);
  app.post("/api/viewslot", viewSlot);
  app.post("/api/getslot", getSlot);
  //   app.post("/api/deletesession", deleteSession);
};

var studmatch;

//Viewing all the sessions

function bookingSlot(req, res) {
  bookslot.findAll().then((data) => {
    res.send(data);
    // console.log(data);
  });
}

//View slot

function viewSlot(req, res) {
  var studentid = req.body.studentid;
  var id = req.body.id;
  var courseid = req.body.courseid;
  if (courseid == "COMP5703") {
    var groupName = req.body.groupName[0].group_name;
    bookslot
      .findAll({
        where: {
          group_name: groupName,
        },
      })
      .then((data) => {
        res.send(data);
      });
  }
  else {
    indtable
      .findAll({
        attributes: ["project_id"],
        where: {
          sid: studentid,
        },
      })
      .then((data) => {
        var projectid = data.map((d) => d.project_id).toString();
        bookslot
          .findAll({
            where: {
              group_name: projectid,
            },
          })
          .then((data) => {
            res.send(data);
          });
      });
  }
}

//Getting slot

function getSlot(req, res) {
  const id = req.body.data;
  bookslot.findByPk(id).then((data) => {
    res.send(data);
  });
}

//Checking student's Groupid
var studmatch;
async function checkGroup(req, res) {
  const studentid = req.body.studentid;

  await grouptable
    .findAll({
      attributes: ["group_name"],
      where: {
        [Op.or]: [
          { student_one: studentid },
          { student_two: studentid },
          { student_three: studentid },
          { student_four: studentid },
          { student_five: studentid },
        ],
      },
    })
    .then((data) => {
      res.send(data);
      studmatch = data.map((d) => d.group_name);
      // console.log(studentid + ":" + studmatch);
    });
}
// console.log("student exists in " + JSON.stringify(studmatch));

//Updating slot

async function updateSlot(req, res) {
  var courseid = req.body.courseid;
  var id = req.body.id;
  const studentid = req.body.studentid;


  if (courseid == "COMP5703") {
    var groupName = req.body.groupName[0].group_name;
    // if (groupName == "" || null) {
    //   res.send({ message: "You have to select a project to book a presentation slot !" });
    // }
    // else  {
      await bookslot
        .findAll({
          attributes: ["group_name"],
          where: {
            group_name: groupName,
          },
        })
        .then((data) => {
          var groupmatched = data.map((d) => d.group_name);

          if (groupmatched == groupName) {
            console.log("slot already booked");
            res.send({ message: "Your group has already booked a slot !" });
          } else {
            console.log("slot not booked");
            bookslot.update(
              { group_name: req.body.groupName[0].group_name },
              { where: { id: id } }
            );
            res.send({ message: "You have booked a slot for your group!" });
          }
        });
    //}
   } 
  else {
      await indtable
        .findAll({
          attributes: ["project_id"],
          where: {
            sid: studentid,
          },
        })
        .then((data) => {

          var projectid = data.map((d) => d.project_id).toString();
          if (projectid == "" || null) {
            res.send({
              message: "You have to select a project to book a presentation slot !"
            });
          }
          else {
            bookslot.findAll({
              attributes: ["group_name"],
              where: {
                group_name: projectid
              }
            }).then((resp) => {
              var groupmatch = resp.map((d) => d.group_name)
              if (groupmatch == projectid) {

                res.send({ message: "Your have already booked a slot !" });
              }
              else {
                indtable.findAll({
                  attributes: ["project_id", "status"],
                  where: {
                    sid: studentid,
                  },
                }).then((rdata) => {
                  var status = rdata.map((d) => d.status).toString();
                  var projectid = rdata.map((d) => d.project_id).toString();
                  // if(projectid !== "" || null){
                  if (status == "Accepted") {
                    bookslot.update({ group_name: projectid }, { where: { id: id } });
                    res.send({ message: "You have booked a slot!" });
                  }
                  else if (status == "Rejected") {
                    res.send({
                      message: "You cannot book a slot as your project is rejected"
                    });
                  }
                  else if (status == "Pending") {
                    res.send({
                      message: "You cannot book a slot as your project is in pending status"
                    });
                  }
                })

              }
            })
          }
        });
    }

  }



//   if(courseid == "COMP5709" ){
//     // console.log("inside if courseid:" +courseid);
//     await indtable.findAll({attributes: ["project_id", "status"],
//     where:{
//        sid : studentid,
//     }
//   }).then((data)=>{
//         var status = (data.map(d=>d.status)).toString()
//         var projectid = (data.map(d=>d.project_id)).toString()
//         console.log(projectid)
//         console.log(status)
//         if(status == "approved"){
//     bookslot.update(
//       {group_name : projectid},
//       {where: {id : id}}
//     )
//     res.send({message: 'You have booked a slot!'});

//     }
//     else{
//       res.send({message: 'You cannot book a slot as your project is not approved'});
//     }
//   })
// }

//   else if(courseid == "COMP5703"){
//     var groupName = req.body.groupName[0].group_name;
//     await bookslot.findAll({attributes: ["group_name"],
//       where: {
//         group_name : groupName,
//       }
//     }).then((data)=>{

//       var groupmatched = data.map(d=>d.group_name)

//     if(groupmatched == groupName)
//     {
//       console.log("slot already booked")
//       res.send({message: 'Your group has already booked a slot !'});

//     }
//     else
//     {
//       console.log("slot not booked")
//       bookslot.update(
//         {group_name : req.body.groupName[0].group_name},
//         {where: {id : id}}
//       )
//       res.send({message: 'You have booked a slot for your group!'});
//     }

//   })

//   }
//   else{
//     res.send({message: 'Check your project status'})
//   }

// }

//

//   var students = [];
//   await grouptable.findAll({ attributes: ["student_one", "student_two","student_three","student_four","student_five"],
//     where: {
//       group_name : group_name
//     }
//   })
//   .then((data) => {
//     // console.log(JSON.stringify(data));
//       var studentsRaw;
//       var studentsArray = [];
//        studentsRaw = data.map(d=>{ return d.student_one+","+d.student_two+","+d.student_three+","+d.student_four+","+d.student_five}).pop();
//       studentsArray= studentsRaw.split(",");
//        console.log(studentsArray);

//        var match;

//        if( match = studentsArray.includes(studentid) )
//        {
//         bookslot.update(slot, { where: { id: id} }).then((data) => {
//                   res.send(data);q
//                 });
//        }else{
//            console.log("student not in the group")

//        }

// })
// }
