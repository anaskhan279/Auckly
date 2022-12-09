const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("./db/database");
const app = express();

app.use(express.json());


dotenv.config({path:'./config.env'});

app.use(require('./routes/auth'));

mongoose.set('strictQuery',true);

const PORT = process.env.PORT



app.get('/',(req,res)=>{
    res.send('auckly there');
})

app.listen(PORT,()=>{
    console.log('listening  3000');
})