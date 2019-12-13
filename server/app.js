`use strict`
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// libraries
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.port || 3000
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
// connect to mongoose
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
    .then(resolve => {
        console.log(`server is connected !!`)
    })
    .catch( err => {
        console.log(err)
    })
    
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(morgan('dev'))

// router untuk user
app.use('/', router)
app.use(errorHandler)

// connect to express
app.listen(port, () => console.log(`App listening on port ${port}!`))