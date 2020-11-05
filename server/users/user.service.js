const config = require("../config.json");
const jwt = require("jsonwebtoken");
const Role = require("../_helpers/role");

console.log("user service");
var mysql = require("mysql");
//var users;
var users = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cms",
});

// open the connection
connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    let query = "SELECT * FROM users";
    connection.query(query, (error, response) => {
      if (error) throw error;
      console.log("res:", response);
      users = response;

      console.log("users1:", users);
    });
  }
});

//console.log("users:", users);

module.exports = {
  authenticate,
  getAll,
  getById,
};

async function authenticate({ username, password }) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}

async function getAll() {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function getById(id) {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
