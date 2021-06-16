const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
var connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});
module.exports = connection;