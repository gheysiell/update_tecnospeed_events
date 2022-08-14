require('dotenv').config()

const configs = {    
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    table: process.env.TABLE,
    token_api: process.env.TOKEN_BEARER,
}

module.exports = configs 