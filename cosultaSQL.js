const pool = require('./conexionDB.js')

pool.connect(err =>{
    if(err){
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

async function read () {
    const client = await pool.connect(),
          respuesta = await client.query(`select * from usuarios`);
    
    client.release()
    return respuesta.rows
}
async function create (nombre, balance) {
    const client = await pool.connect()
    await client.query(
    `insert into usuarios (nombre, balance) values ('${nombre}', ${balance}) returning *`)
    client.release()
}
// editar 
async function update (nombre, balance, id) {
    const client = await pool.connect()
    await client.query(`update usuarios set nombre='${nombre}', balance=${balance} where id=${id}`,)
    client.release()
}
// eliminar
async function eliminar (id) {
    const client = await pool.connect()
    await client.query(`delete from usuarios where id=${id}`)
    client.release()
}

module.exports = {
    read, create, update, eliminar
}