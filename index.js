const express = require('express')
const app = express()
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRoute")
const bookRouter = require("./routes/bookRoute")
const borrowRouter = require("./routes/borrowRoute")
const reportRouter = require("./routes/reportRoute")
// middlewares
app.use(express.json());
app.use(cookieParser());
// routes
app.get("/",(req,res)=>{
    res.send(`hello, Welcome to Nalanda Library`)
})
// users
app.use('/users', userRouter);
app.use("/books",bookRouter)
app.use("/borrow",borrowRouter)
app.use("/report",reportRouter)
const Port = process.env.PORT
app.listen(Port,()=>{
    console.log("hello")
})