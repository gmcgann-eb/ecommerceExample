const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./src/routes/user.routes')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

//db connection
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));


//middlewares//
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//routes
const apiPrefix = "/api"
app.use(apiPrefix,userRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`running on port ${port}`)
})


