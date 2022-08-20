const express = require('express'),
      f = require('./funtionForm.js'),
      { read, create, update, eliminar} = require('./db/cosultaSQL.js'),
      { readTransferencia, createTransferencia } = require('./db/tranferenciaSQL.js');

const app = express()

app.use(express.static('public')) 

app.get('/',async (req,res)=>{

})

app.post('/usuario', async (req,res) => {
    try {
        const datos = await f.getForm(req),
              nombre = datos.nombre,
              balance = datos.balance
        await create(nombre, balance)
        res.end()
    } catch (error) {
        console.log(error);
    }
})

app.get('/usuarios', async (req,res) => {
    try {
        const datos = await read()
        res.json(datos)
    } catch (error) {
        console.log(error);
    }
})

app.put('/usuario', async (req,res) => {
    try {
        const datos = await f.getForm(req),
              nombre = datos.name,
              balance = datos.balance,
              id = req.query.id;
        await update(nombre, balance, id)
        res.end()
    } catch (error) {
        console.log(error);
    }
})

app.delete('/usuario', async (req,res) => {
    try {
        const id = req.query.id;
        await eliminar(id)
        res.end()        
    } catch (error) {
        console.log(error);
    }
})

// rutas tabla transferencia

app.post('/transferencia', async (req,res) => {
    const datos = await f.getForm(req),
         emisor = datos.emisor,
         receptor = datos.receptor,
         monto = datos.monto
    try {
        await createTransferencia(emisor, receptor, monto)
    } catch (error) {
        res.statusCode = 400
        return res.json({error: error})
    }
    res.json({})
})

app.get('/transferencias', async (req,res) => {
    try {
        const datos = await readTransferencia()
        res.json(datos)
    } catch (error) {
        console.log(error);
    }
})



app.get('*', (req, res) => {
    res.statusCode = 404
    res.send('Ruta no implementada')
  })
  
  app.listen(3000, () => {
    console.log(`Servidor en puerto 3000`);
  });