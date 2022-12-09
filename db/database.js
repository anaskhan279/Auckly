const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const DB = process.env.DATABASE_URL

mongoose.set('strictQuery',true);

mongoose.connect(DB).then(()=>{
    console.log('Connected to mongodb');
}).catch((err) =>{console.log(err);})
