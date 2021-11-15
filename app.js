require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app=express()

// packages
const morgan=require('morgan')

const connectDB=require('./db/connect')

// error handler
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))

// routes

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 3000

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port} ...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()