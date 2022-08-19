const express = require('express'),
      f = require('./funtionForm.js'),
      { read, create, update, eliminar} = require('./cosultaSQL.js'),
      { readTransferencia, createTransferencia } = require('./tranferenciaSQL.js');

const app = express()

app.use(express.static('public')) 

app.get('/',async (req,res)=>{

})

app.post('/usuario', async (req,res) => {
    const datos = await f.getForm(req),
          nombre = datos.nombre,
          balance = datos.balance
    await create(nombre, balance)
    res.end()
})

app.get('/usuarios', async (req,res) => {
    const datos = await read()
    res.json(datos)
})

app.put('/usuario', async (req,res) => {
    const datos = await f.getForm(req),
          nombre = datos.name,
          balance = datos.balance,
          id = req.query.id;
    await update(nombre, balance, id)
    res.end()
})

app.delete('/usuario', async (req,res) => {
    const id = req.query.id;
    await eliminar(id)
    res.end()        
})

// rutas tabla transferencia

app.post('/transferencia', async (req,res) => {
    const datos = await f.getForm(req),
         emisor = datos.emisor,
         receptor = datos.receptor,
         monto = datos.monto
    let fecha = new Date()
    await createTransferencia(emisor, receptor, monto, fecha)
    res.end()
})

app.get('/transferencias', async (req,res) => {
    const datos = await readTransferencia()
    res.json(datos)
})



app.get('*', (req, res) => {
    res.statusCode = 404
    res.send('Ruta no implementada')
  })
  
  app.listen(3000, () => {
    console.log(`Servidor en puerto 3000`);
  });