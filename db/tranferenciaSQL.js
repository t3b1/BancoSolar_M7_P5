const pool = require('./conexionDB.js')
const { validarIngreso, validarMonto, validarCliente } = require('../funcionValidar.js');

pool.connect(err => {
    if (err) {
        console.log(`error al conectar a la base de datos ${err}`);
    }
})

async function readTransferencia() {
    const client = await pool.connect()
    try {
            const respuesta = await client.query({
            text:`select transferencias.id, emisores.nombre, receptores.nombre, monto, fecha
            from transferencias
            join usuarios as emisores on emisor = emisores.id
            join usuarios as receptores on receptor = receptores.id;`,
            rowMode: 'array'
        });
        let listar = respuesta.rows;
        listar = listar.map(data => Object.values(data))
        return listar;
    } catch (error) {
        console.log(error);
    }
    client.release()
}
async function createTransferencia(emisor, receptor, monto) {
    
    validarIngreso(monto)

    const client = await pool.connect()
    const objEmisor = await client.query(`select * from usuarios where nombre='${emisor}'`),
          id_receptor = await client.query(`select * from usuarios where nombre='${receptor}'`);

    validarMonto(objEmisor, monto)
    validarCliente(objEmisor, id_receptor)

    try {
        const descuento = objEmisor.rows[0].balance - monto,
              deposito = (id_receptor.rows[0].balance + monto);
              
        await client.query(`update usuarios set balance=${descuento} where id=${objEmisor.rows[0].id}`)
        await client.query(`update usuarios set balance=${deposito} where id=${id_receptor.rows[0].id}`)
        await client.query(`insert into transferencias (emisor, receptor, monto) values (${objEmisor.rows[0].id},${id_receptor.rows[0].id},${monto})`)
    } catch (error) {
        console.log(error);
    }
    client.release()
}


module.exports = {
    readTransferencia, createTransferencia
}