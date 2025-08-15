const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const userRoutes = require('./routes/userRoutes')

const PORT = 3000
app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/crudapp')
.then(()=> console.log('Mongodb is connected successfully!!'))
.catch((error)=> console.log('Error in DB connection!!', error))

app.listen(PORT, ()=>{
    console.log(`Server is live at http://localhost:${PORT}`)
})