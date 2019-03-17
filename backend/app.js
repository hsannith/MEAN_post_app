const express=require('express');
const bodyParser=require('body-parser');
const app=express();

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
    const post=req.body;
    console.log(post);
    res.status(201).json({
        message:"psot added succesfully"
    });
});

app.get('/api/posts',(req,res,next)=>{

    const posts=[
        {
            id:"scsdcscsc",
            title:"First post from server",
            content:"content of post from server"
        },
        {
            id:"cscscsc",
            title:"Sec post from server",
            content:"content of post from server"
        },
        {
            id:"cnscjkskckskc",
            title:"Third post from server",
            content:"content of post from server"
        }
    ]
    res.status(200).json({
        message:"posts fetched from server",
        posts:posts
    });
})

module.exports=app;