const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Homebrew99",
    database: "employees",
    port: 3306
})

connection.connect(function(err){
    if (err) throw err
    console.log("connected!")
})

module.exports = connection