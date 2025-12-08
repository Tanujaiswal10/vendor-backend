require("dotenv").config();
const express = require("express");
const connectToDb = require('./config/db')
const app = express();
const port = 5000;

//route
const productRoute = require('./route/productR')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/uploads', express.static('uploads'));

//database
connectToDb;


app.get("/",(req,res)=>{
    res.send("Working well!!")
})
app.use('/product',productRoute)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
});