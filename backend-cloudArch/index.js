const express = require("express");
const cors= require("cors");
const {conexion}=require("./db/conexion")

const app = express();
//conexion base de datos mongo
conexion();

app.use(cors())

app.use(express.json());

//rutas
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/documents'))
app.use('/api', require('./routes/carpeta'))
app.use('/api', require('./routes/compartido'))


app.get("/prueba", (req, res)=>{
    console.log("Prueba end point");
})
app.listen(4001, ()=>{

    console.log("Server run in port: "+4000)
});