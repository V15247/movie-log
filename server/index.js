const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();
const authRoutes = require('./routes/auth.js');

//Connect to MongoDB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true } );

//Middlewares
app.use('/api/users', authRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})