const mysql = require('mysql2');
//VARIABLES A CAMBIAR
let host = 'localhost', user = 'root', password='seba123', database='eCommerceSubgrupo2', port=3307; // (DATOS DE CONEXIÓN A MYSQL)
//
const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port
});
module.exports = connection;