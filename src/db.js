const mysql = require('mysql2/promise')
const configs = require('./config')

const connect = async () => {
    try {
        const connection = await mysql.createConnection({
            host: configs.server,
            user: configs.user,
            password: configs.password,
            database: configs.database,
        })    
        global.connection = connection
        console.log('successfully connection')
        return connection                            
    } catch(err) {
        console.log(`erro: ${err}`)
        return false
    }
}

module.exports = {
    connect
}