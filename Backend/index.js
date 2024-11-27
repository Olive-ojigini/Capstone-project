const dotenv =require('dotenv'); 
dotenv.config();

const express= require('express');
const mongoose=require('mongoose');


const app=express();

//set up the PORT
const PORT = process.env.PORT || 3000;

const connectDB=require('./Config/configdb');

//connectDB();

mongoose.connection.once('open',()=>{
    console.log('connect to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
);
module.exports=app;

