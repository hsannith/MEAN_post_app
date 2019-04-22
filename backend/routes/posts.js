const express=require('express');
const multer=require('multer');

const router=express.Router();
const Post=require('../models/post');
const checkAuth=require("../middleware/check-auth")

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error=new Error("invalid Mime type");

        if(isValid){
            error=null;
        }

        cb(error,"backend/images")
     },
     filename:(req,file,cb)=>{
         const name=file.originalname.toLowerCase().split(' ').join('-');
         const ext=MIME_TYPE_MAP[file.mimetype];
         cb(null,name+'-'+Date.now()+'.'+ext);
     }
})

router.post('',checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
    const url=req.protocol+'://'+req.get("host");
    console.log(req);
    console.log(url+"/images/"+req.file.filename);

    //user who has created the post is added in the request 
    //in the middleware in field "userData" by decoding the token passed from front end
    const postCreatorID=req.userData.userId;
    const post=new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+"/images/"+req.file.filename,
        creator:postCreatorID
    });
    
    console.log(post);
    post.save().then( createdPost =>{
        res.status(201).json({
            message:"psot added succesfully",
            post:{
                ...createdPost,
                id:createdPost._id
            }
        });

    })
  
});

router.put('/:id',checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
    let imagePath=req.body.imagePath;
    if(req.file){
        const url=req.protocol+'://'+req.get("host");
        imagePath=url+"/images/"+req.file.filename
    }
   
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        imagePath:imagePath,
        creator:req.userData.userId
    })
    Post.updateOne({_id: req.params.id,creator:req.userData.userId },post)
    .then(result=>{
        console.log(result);
        if(result.nModified>0){
            res.status(200).json({ message:'successfully updated'});
        }
        else{
            res.status(401).json({ message: 'Not AUthorized'});
        }
    })
})

router.get('',(req,res,next)=>{
    const pageSize=+req.query.pagesize;
    const currentPage=+req.query.page;
    const postQuery=Post.find();  //does not fetch data.It is just a string 
    let postFetchedWithPAginationFromDB;
    //appending the mongo query with pagination conditions
    if(pageSize && currentPage){
        postQuery
        .skip(pageSize *(currentPage-1))
        .limit(pageSize);
    }
    
    postQuery
    .then(documents=>{
        postFetchedWithPAginationFromDB=documents;
        return Post.countDocuments()
    })
    .then(count=>{
        res.status(200).json({
            message:"posts fetched from server",
            posts:postFetchedWithPAginationFromDB,
            totalPosts:count
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

router.delete('/:id',checkAuth,(req,res,next)=>{

    Post.deleteOne({_id:req.params.id,creator:req.userData.userId})
    .then(result=>{
        console.log(result);
        if(result.n>0){
            res.status(200).json({message:"post deleted successfully" }) 
        }
        else{
            res.status(401).json({ message: 'Not AUthorized'});
        }
    })



})

module.exports=router;