const mongoose = require('mongoose')
const { MONGO_DB_URI } = process.env

const connectionString = MONGO_DB_URI
mongoose.set('strictQuery', false)

//connection mongo

mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')

    }).catch((err) => {
        console.log(err)
    })
