const mysql = require('mysql2');
//VARIABLES A CAMBIAR
let host = 'localhost', user = 'root', password='bruno123', database='eCommerceSubgrupo2', port=3306; // (DATOS DE CONEXIÓN A MYSQL)
//
const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port
});
module.exports = connection;