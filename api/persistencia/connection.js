const mysql = require('mysql2');
let host = 'localhost', user = 'root', password='bruno123', database='eCommerceSubgrupo2'; // (DATOS DE CONEXIÓN A MYSQL)
const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});
module.exports = connection;