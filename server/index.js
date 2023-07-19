const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();


//Connect to MongoDB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true } );


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})