
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');



// crear el servidor de express
const app= express();

//base de datos
dbConnection();

app.use(cors());

//Lectura y Parseo del body

app.use(express.json());
 


//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login' , require('./routes/auth'));



app.listen( process.env.PORT , ()=> {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT );
});