const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter = express.Router()


authRouter.post("/register",async(req,res)=>{
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        try{
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:hash,
            })
            const user = await newUser.save();
            const token = jwt.sign({ id:user._id,isAdmin:user.isAdmin}, 'secret_key');
            const {password,...info}=user._doc;
            res.json({...info,token});
         
        }
        catch(err){
            console.log(err);
            res.json({message:"error"});
        }
        
    });  
})
authRouter.post("/login",async(req ,res)=>{
   
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) res.json({message:"first sign up"});
        else{
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result){
                   
                    const token = jwt.sign({ id:user._id,isAdmin:user.isAdmin}, 'secret_key');
                    const {password,...info}=user._doc;
                    res.json({...info,token});
                }
                else res.json({messge:"wrong email or password"});
                
            });
        }
        
    }
    catch(err){
        console.log(err);
        res.json({message:"error occured in retriving user from Db using email"})

    }
    
})

module.exports = authRouter;