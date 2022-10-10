var express = require('express');

/*
network -> routing (las rutas)
*/

const config = require('../config.js');
const app = express();
const user = require('./components/user/network')

//ROUTES
//Que ruta esperar, que clase enviar
app.use('/api/user', user);


app.listen(config.api.port, ()=>{
    console.log(`Api escuchando en el puerto ${config.api.port}`);
});