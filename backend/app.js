const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const postsRoutes=require('./routes/posts');
const userRoutes=require('./routes/user');
const path=require('path');

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
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,PUT, OPTIONS"
  );
  next();
});




//redirect url with /api/posts to this url
app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);


module.exports=app;