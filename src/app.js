const axios = require('axios')
const configs = require('./config')
const db = require('./db')

const events_updating = async () => {
    const conn = await db.connect()

    if (conn) {
        console.log(conn)

        //const [rows] = await conn.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?')
        // rows.map(row => {
        //     console.log(row)
        // })

        /*const query_all = await model_events_tecnospeed.findAll()
        const events = query_all.map((event) => {
            return event.dataValues.id_webhook
        })*/

        /*events.map(async event => {
            await axios.get(`https://pix.tecnospeed.com.br/api/v1/pix/${event}`, {
                headers: {
                    "Authorization": configs.token_api
                }
            })
            .then(response => {
                console.log(response.data.amount)
                console.log(conn)
                model_events_tecnospeed.update({valor: response.data.amount}, {
                    where: {
                        id_webhook: event
                    }
                })
            })
            .catch(err => {
                console.log(`erro: ${err}`)
            })
        })*/
    }
}

events_updating()