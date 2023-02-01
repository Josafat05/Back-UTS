const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

//Capturar el body

//Conexion a la base de datos
const url = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.fhwsfjf.mongodb.net/${process.env.DBNAME}`
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos!!'))
.catch((error) => console.log('Error: '+ error))

// Creacion e Importacion de Rutas
const authRoutes = require('./routes/auth')

//Ruta de middleware
app.use('/api/user', authRoutes)

//Ruta raíz
app.get('/', (req, res) => {
    res.json({
        estado:true,
        mensaje: 'si funciona...'
    })
})

//Arrancar el servidor
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Escuchad en el puerto: ${PORT}`) //Faltan comillas
})