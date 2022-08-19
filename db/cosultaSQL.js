const pool = require('./conexionDB.js')

pool.connect(err => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

async function read() {
    try {
        const client = await pool.connect(),
              respuesta = await client.query(`select * from usuarios`);

        client.release()
        return respuesta.rows
    } catch (error) {
        console.log(error);
    }
}
async function create(nombre, balance) {
    try {
        const client = await pool.connect()
        await client.query(
            `insert into usuarios (nombre, balance) values ('${nombre}', ${balance}) returning *`)
        client.release()
    } catch (error) {
        console.log(error);
    }
}
// editar 
async function update(nombre, balance, id) {
    try {
        const client = await pool.connect()
        await client.query(`update usuarios set nombre='${nombre}', balance=${balance} where id=${id}`,)
        client.release()
    } catch (error) {
        console.log(error);
    }
}
// eliminar
async function eliminar(id) {
    try {
        const client = await pool.connect()
        await client.query(`DELETE FROM usuarios WHERE id=${id};`)
        client.release()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    read, create, update, eliminar
}