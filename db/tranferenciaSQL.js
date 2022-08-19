const pool = require('./conexionDB.js')

pool.connect(err => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

async function readTransferencia() {
    try {
        const client = await pool.connect(),
            respuesta = await client.query({
            text:`select transferencias.id, emisores.nombre, receptores.nombre, monto, fecha
            from transferencias
            join usuarios as emisores on emisor = emisores.id
            join usuarios as receptores on receptor = receptores.id;`,
            rowMode: 'array'
        });
        let listar = respuesta.rows;
        listar = listar.map(data => Object.values(data))
        client.release()
        return listar;
    } catch (error) {
        console.log(error);
    }
}
async function createTransferencia(emisor, receptor, monto) {
    try {
        const client = await pool.connect()
              id_emisor = await client.query(`select id from usuarios where nombre='${emisor}'`),
              id_receptor = await client.query(`select id from usuarios where nombre='${receptor}'`);
        await client.query(`insert into transferencias (emisor, receptor, monto) values (${id_emisor.rows[0].id},${id_receptor.rows[0].id},${monto})`)
        client.release()
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    readTransferencia, createTransferencia
}