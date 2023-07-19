const router = require('express').Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();  
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


router.post('/register', jsonParser, async (req,res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;