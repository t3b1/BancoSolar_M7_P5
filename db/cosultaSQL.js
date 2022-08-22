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
        await client.query(`insert into usuarios (nombre, balance) values ('$1', $2) returning *`,[nombre,balance])
    } catch (error) {
        console.log(error);
    }
    client.release()
}
// editar 
async function update(nombre, balance, id) {
    const client = await pool.connect()
    try {
        await client.query(`update usuarios set nombre='$1', balance=$2 where id=$3`,[nombre,balance,id])
    } catch (error) {
        console.log(error);
    }
    client.release()
}
// eliminar
async function eliminar(id) {
    const client = await pool.connect()
    try {
        await client.query(`delete from transferencias where emisor=$1 or receptor=$1`,[id])
        await client.query(`DELETE FROM usuarios WHERE id=$1;`,[id])
    } catch (error) {
        console.log(error);
    }
    client.release()
}

module.exports = {
    read, create, update, eliminar
}