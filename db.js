const mysql = require("mysql2/promise")
async function getConnection() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mynewpassword",
    database: "BOM_SONO",
  })
  //connection.connect()
  return connection
}

module.exports = getConnection