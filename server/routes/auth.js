const router = require('express').Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();  
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {validateRegister} = require('../validation/authValidate.js');



router.post('/register', jsonParser, async (req,res) => {

    //Validates inputs
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error);

     //Checks if email exists
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exists');
 
     //Hash password
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', jsonParser, async(req,res) => {

    
})

module.exports = router;