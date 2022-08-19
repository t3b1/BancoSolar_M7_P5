const pool = require('./conexionDB.js')

pool.connect(err => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

const formatoDate = (current_datetime) => {
    let formated_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formated_date;
}
async function readTransferencia() {
    const client = await pool.connect(),
        respuesta = await client.query(`select fecha, emisores.nombre as emisor, receptores.nombre as receptor, monto
        from transferencias
        join usuarios as emisores on emisor = emisores.id
        join usuarios as receptores on receptor = receptores.id;`);
    client.release()
    return respuesta.rows
}
async function createTransferencia(emisor, receptor, monto, fecha) {
    const client = await pool.connect()
          id_emisor = await client.query(`select id from usuarios where nombre='${emisor}'`),
          id_receptor = await client.query(`select id from usuarios where nombre='${receptor}'`);
    await client.query(`insert into transferencias (emisor, receptor, monto,fecha) values (${id_emisor.rows[0].id},${id_receptor.rows[0].id},${monto},'${formatoDate(fecha)}')`)
    client.release()
}


module.exports = {
    readTransferencia, createTransferencia
}