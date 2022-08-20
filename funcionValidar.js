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

function validarCliente(objEmisor, objReceptor){
    if (objEmisor.rows[0].id === objReceptor.rows[0].id){
        throw 'no puede transferir a la misma cuenta'
    }
}
function sumaMonto (objReceptor, monto) {
    let montof = parseInt(monto)
    deposito = objReceptor.rows[0].balance + montof
    return deposito
}
function restaMonto (objEmisor, monto) {
    let montof = parseInt(monto)
    descuento = objEmisor.rows[0].balance - montof
    return descuento
}

module.exports = {
    validarIngreso, validarMonto, validarCliente, sumaMonto, restaMonto
}