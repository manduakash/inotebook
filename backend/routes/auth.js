const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


//ROUTE 1- creating a user using: POST "/api/v1/auth/signup" *No Login require
router.post('/signup', [
    //validation
    body('fname', 'First Name must be atleast 3 charaters').isLength({min: 3}),
    body('lname', 'Last Name must be atleast 3 charaters').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5})],

   async (req, res)=>{

        try{

        // flag
        let success = true;
        //validation error handling
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        //checking if user already exists
        let user = await User.findOne({email: req.body.email});
        if(user){
            success=false;
            return res.status(400).json({success, error: "User already exists with this email."})
        }

        //securing the password usging hashing and salt mechanism
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //creating user
        user = await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: secPass,
        })

        //creating json web token
        const data = {
            user:{
                id: user._id
            }
        }
        const authToken = jwt.sign(data, 'inotebook');
        success=true;
        res.json({success, authToken});

        } catch(error){
            success=false;
            res.status(500).json({success ,error: "Internal server error"});
        }
    }
);

//ROUTE 2- Authenticate a user using: POST "/api/v1/auth/login" *No Login require
router.post('/login', [
    //validation
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password can not be blank.').exists()],

   async (req, res)=>{

    // flag
    let success = true;

    //validation error handling
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //destructuring
    const{email, password} = req.body;

    try {
        //fetching user
        let user = await User.findOne({email});

        //checking whether user is exist or not
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials."})
        }

        //comparing password with stored hashed password
        if(!bcrypt.compare(password, user.password)){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials."})
        }

        //creating json web token
        const token = jwt.sign({user: {id: user.id}}, 'inotebook');
        success = true;
        res.json({success: success, token: token, name: user.fname});

    }catch(error){
        res.status(500).json({error: "Internal server error."});
    }


   }
);

//ROUTE 2- Get loggedin user details using: POST "/api/v1/auth/getuser". *Login require
router.post('/getuser', fetchuser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})


module.exports = router