require("dotenv").config();
const express = require("express");
const connectToDb = require('./config/db')
const app = express();
const port = process.env.DB_PORT;

//route
const productRoute = require('./route/productR')
const sellerRoute = require('./route/vendorR')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//database
connectToDb;


app.get("/",(req,res)=>{
    res.send("Working well!!")
})
app.use('/product',productRoute)
app.use('/seller',sellerRoute)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
});