
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');



// crear el servidor de express
const app= express();

//base de datos
dbConnection();

app.use(cors())
 


//Rutas
app.get('/', (req, res )=> {
    res.json({ 
        ok:true,
        msg: 'Hola Mundo'
    })
});

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })


app.listen( process.env.PORT , ()=> {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT );
});