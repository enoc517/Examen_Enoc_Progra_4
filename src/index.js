const request = require("express");
const mongoose = require("mongoose");
const usuarioruta = require("./routes/usuario");
const citasRuta = require("./routes/citas")
const vacacionesRuta = require("./routes/vacaciones")
const login = require("./routes/login")
const rutaProtegida = require('./middlewares/autorizacion');
require("dotenv").config();

const app = request();
const port = 9000;

//routes



//agregacion de rutas
app.use(request.json());
app.use('/api',login);
app.use('/api',usuarioruta);
app.use('/api',citasRuta);
app.use('/api',vacacionesRuta);




//mongodb connexion
mongoose.connect(process.env.MONGODBURI).then(()=>console.log('conectado a mongoatlas')).catch((error)=>console.error(error));

app.listen(port,()=>console.log('servidor escuchando',port));