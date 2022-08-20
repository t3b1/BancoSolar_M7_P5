function validarIngreso (monto) {
    let montof = parseInt(monto)
    if(isNaN(montof)) {
        throw 'valor no valido'
    }
    else if (montof <= 0) {
        throw 'ingrese valor correcto'
    }
}

function validarMonto(objEmisor, monto) {
    let montof = parseInt(monto)
    if (objEmisor.rows[0].balance < montof) {
        throw 'el monto es mayor a su balance'
    }
}

function validarCliente(objEmisor, id_receptor){
    if (objEmisor.rows[0].id === id_receptor.rows[0].id){
        throw 'no puede transferir a la misma cuenta'
    }
}
/*function sumaresta (balance_emisor, balance_receptor, monto) {
    let montof = parseInt(monto)
    const descuento = balance_emisor.rows[0].balance - montof,
          deposito = balance_receptor.rows[0].balance + montof
    return descuento, deposito;
}*/

module.exports = {
    validarIngreso, validarMonto, validarCliente
}