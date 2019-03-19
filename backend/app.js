const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const Post=require('./models/post');

mongoose.connect("mongodb+srv://hitesh:88JxlqrdjAbbK5QB@cluster0-cyjbs.mongodb.net/MEANproj?retryWrites=true",{ useNewUrlParser: true })
.then(()=>{
    console.log("connected to database");
})
.catch(()=>{
    console.log("Not connected to database");
})



app.use(bodyParser.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts',(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message:"psot added succesfully"
    });
});

app.get('/api/posts',(req,res,next)=>{

    Post.find()
    .then(postsFromDB=>{
        res.status(200).json({
            message:"posts fetched from server",
            posts:postsFromDB
        });
    });
   
})

module.exports=app;