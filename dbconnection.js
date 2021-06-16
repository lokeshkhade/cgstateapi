const dotenv = require('dotenv');
dotenv.config();
var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'bqr58fqstj5mn6cxc6gc-mysql.services.clever-cloud.com',
    user: 'ubm8fxdsq6dm5fcf',
    password: 'sASURIhOVpEr5hWw8DDi',
    database: 'bqr58fqstj5mn6cxc6gc',
    multipleStatements: true
});
module.exports = connection;