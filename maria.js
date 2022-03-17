const maria = require("mysql")

const conn = maria.createConnection({
    host:'3.34.12.11',
    port:3306,
    user:'nodeTest',
    password:'nodeTest1!',
    database:'nodetest',
})

module.exports = conn;