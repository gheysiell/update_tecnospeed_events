const axios = require('axios')
const configs = require('./config')
const db = require('./db')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
var option_selected

rl.question(`which update do you want to run ? \n 1 - update values \n 2 - update dates \n`, async option => {
    option_selected = option
    await events_updating()
})

const events_updating = async () => {
    const conn = await db.connect()    
    
    if (conn) {
        if (option_selected == 1) {
            const [id_event] = await connection.execute(`SELECT id_webhook FROM ${configs.table} WHERE valor = 0`)
            id_event.map(async row => {
                await axios.get(`https://pix.tecnospeed.com.br/api/v1/pix/${row.id_webhook}`, {
                    headers: {
                        "Authorization": configs.token_api
                    }
                })
                .then(async response => {
                    await connection.execute(`UPDATE ${configs.table} SET valor = ${response.data.amount} WHERE id_webhook = '${row.id_webhook}'`)
                    .then(() => { console.log(`updating: ${response.data.id} | ${response.data.amount}`) })
                    .catch(err => console.log(`error: ${err}`))
                })
                .catch(err => {
                    console.log(`erro: ${err}`)
                })
            })        
        } else {
            const [id_event] = await connection.execute(`SELECT id_webhook FROM ${configs.table} WHERE date = '0000-00-00 00:00:00'`)
            id_event.map(async row => {
                await axios.get(`https://pix.tecnospeed.com.br/api/v1/pix/${row.id_webhook}`, {
                    headers: {
                        "Authorization": configs.token_api
                    }
                })
                .then(async response => {
                    await connection.execute(`UPDATE ${configs.table} SET date = '${response.data.updatedAt.substr(0, 19)}' WHERE id_webhook = '${row.id_webhook}'`)
                    .then(() => { console.log(`updating: ${response.data.id} | ${response.data.updatedAt.substr(0, 19)}`) })
                    .catch(err => console.log(`error: ${err}`))
                })
                .catch(err => {
                    console.log(`erro: ${err}`)
                })
            })
        }
    }
}