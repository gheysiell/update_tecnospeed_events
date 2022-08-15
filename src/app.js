const axios = require('axios')
const configs = require('./config')
const db = require('./db')

const events_updating = async () => {
    const conn = await db.connect()
    if (conn) {
        const [id_event] = await connection.execute(`SELECT id_webhook FROM ${configs.table} WHERE valor = 0`)
        id_event.map(async row => {
            await axios.get(`https://pix.tecnospeed.com.br/api/v1/pix/${row.id_webhook}`, {
                headers: {
                    "Authorization": configs.token_api
                }
            })
            .then(async response => {                                
                await connection.execute(`UPDATE ${configs.table} SET valor = ${response.data.amount} WHERE id_webhook = '${row.id_webhook}'`)
                .then(() => {console.log(`updating: ${response.data.id} | ${response.data.amount}`)})
                .catch(err => console.log(`error: ${err}`))
            })
            .catch(err => {
                console.log(`erro: ${err}`)
            })                        
        })        
    }
}

events_updating()