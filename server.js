const express = require("express");
const colors= require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path')

dotenv.config()

const app = express()

connectDB()

//middleware
app.use(express.json())
app.use(morgan("dev"))


// routes
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/admin', require('./routes/adminRoutes'))
app.use('/api/v1/doctor', require('./routes/doctorRoutes'))

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

const port = process.env.PORT || 9000
//listen port

app.listen(port, ()=>{
    console.log(`listenting at port ${port} with mode ${process.env.NODE_MODE}`);
})