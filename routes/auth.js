const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
     res.send("hello from router side");
});


router.post('/register', async(req,res)=>{

      const {username, email, phone, password, cpassword} = req.body;

      if(!username ||!email ||!phone ||!password || !cpassword) {
          res.status(400).send("Please fill all the fields");
          return;
      }

      if(password!=cpassword) {
        return res.status(400).json({
            message: 'Password not match'});
       }

      try {
          
          const userexist = await User.findOne({email: email});

          if(userexist){
               return res.status(422).json({error:"User already exists"});
          }

          const user = new User({
              username: username,
              email: email,
              phone: phone,
              password: password,
          });

          await user.save();

          return res.status(201).json({message:"user saved successfully"});
      } catch (error) {
          
          console.log(error);
      }
})


router.post('/login', async(req, res) => {

      try {
            const {email, password} = req.body;

            if(!email ||!password){
                res.status(400).json({error:"please fill all the fields"});
            }

            const userlogin = await User.findOne({email: email});

            if(!userlogin){
                res.status(404).json({message:"user not found"}); 
            } 
            else {
                const isMatch = await bcrypt.compare(password, userlogin.password);

                 const token = await userlogin.generateAuthToken();
                 console.log(token);

                 res.cookie("jwtoken", token, { 
                      expires: new Date(Date.now() + 258920000),
                      httpOnly: true,
                    });

                if(!isMatch){
                    res.status(401).json({message:"Password not match"});
                }
                else{
                    res.status(200).json({message:"login successful"});
                }
            }
      } 
      catch (error) {
           console.log(error); 
      }
      

})
module.exports = router;