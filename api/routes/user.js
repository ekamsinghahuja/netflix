const router = require('express').Router()
const bcrypt = require('bcrypt');
const User = require('../models/user');
const verify = require("../verify");



router.put("/:id",verify,async (req,res)=>{

    if(req.user.id===req.params.id||req.user.isAdmin){
        if(req.body.password){
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                req.body.password = hash;
            });
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.json(updateUser);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json({message:"use can only update your own acount"});
    }
    
})
router.delete("/:id",verify,async(req,res)=>{
    if(req.user.id===req.params.id||req.user.isAdmin){
       
        try{
            await User.findByIdAndDelete(req.params.id);
            res.json({message:"user-deleted"});
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json({message:"use can only update your own account"});
    }
})
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
});
router.get("/",verify,async (req, res) => {
    const query = req.query.new;
    console.log(req.user);
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(5)
          : await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
});
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;
