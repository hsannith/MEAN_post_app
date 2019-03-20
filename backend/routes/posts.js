const express=require('express');

const router=express.Router();
const Post=require('../models/post');


router.post('',(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    console.log(post);
    post.save().then( createdPost =>{
        res.status(201).json({
            message:"psot added succesfully",
            createdpostid: createdPost._id
        });

    })
  
});

router.put('/:id',(req,res,next)=>{
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    })
    Post.updateOne({_id: req.params.id },post)
    .then(result=>{
        console.log(result);
        res.status(200).json({ message:'successfully updated'});
    })
})

router.get('',(req,res,next)=>{

    Post.find()
    .then(postsFromDB=>{
        res.status(200).json({
            message:"posts fetched from server",
            posts:postsFromDB
        });
    });
   
})

router.get('/:id',(req,res,next)=>{

    Post.findById(req.params.id)
    .then(post=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({ message:'post not found'});
        }
    });

});

router.delete('/:id',(req,res,next)=>{

    Post.deleteOne({_id:req.params.id})
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"post deleted successfully"
        }) 
    })



})

module.exports=router;