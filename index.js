require('dotenv').config()
const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Mongo connected!')
}).catch(error => {
    console.log(error.message)
})


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

app.use('/', userRoutes)

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando...' + process.env.PORT)
})
