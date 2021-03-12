const Pool = require('pg').Pool
const pool = new Pool({
    port: "5423",
    user: "postgres",
    host: "localhost",
    password: 'lollms1736'
})

module.exports = pool