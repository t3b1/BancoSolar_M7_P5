const pool = require('./conexionDB.js')

pool.connect(err => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

async function read() {
    const client = await pool.connect()
    try {
        const respuesta = await client.query(`select * from usuarios`);
        return respuesta.rows
    } catch (error) {
        console.log(error);
    }
    client.release()
}
async function create(nombre, balance) {
    const client = await pool.connect()
    try {
        await client.query(`insert into usuarios (nombre, balance) values ('${nombre}', ${balance}) returning *`)
    } catch (error) {
        console.log(error);
    }
    client.release()
}
// editar 
async function update(nombre, balance, id) {
    const client = await pool.connect()
    try {
        await client.query(`update usuarios set nombre='${nombre}', balance=${balance} where id=${id}`)
    } catch (error) {
        console.log(error);
    }
    client.release()
}
// eliminar
async function eliminar(id) {
    const client = await pool.connect()
    try {
        await client.query(`delete from transferencias where emisor=${id} or receptor=${id}`)
        await client.query(`DELETE FROM usuarios WHERE id=${id};`)
    } catch (error) {
        console.log(error);
    }
    client.release()
}

module.exports = {
    read, create, update, eliminar
}