const express=require('express');

const router=express.Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');

router.post("/signup",(req,res,next)=>{
    //we can encrypt the password if needed using bcrypt package
    const user=new User({
        email:req.body.email,
        password:req.body.password
    });
  
    user.save()
    .then(result=>{
        res.status(201).json({
            message:'user created!',
            result:result
        });
    })
    .catch(err=>{
        
        res.status(500).json({
            error:err
        })
    })

})

router.post("/login",(req,res,next)=>{
    User.findOne({ email: req.body.email} )
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:"Invalid email id"
            })
        }

        if(user.password!==req.body.password){
            return res.status(401).json({
                message:"Invalid email password"
            })
        }

        const token=jwt.sign(
            {
            email:user.email,
            userId:user._id
            },
            "secret_this_should_be_longer",
            {
            expiresIn:"1h"
            }
            )


        res.status(200).json({
            jwt:token,
            expiresIn: 3600,  //expires in 3600 seconds
            userId:user._id
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message:"Authorization failed"
        })
    })
})

module.exports=router;

