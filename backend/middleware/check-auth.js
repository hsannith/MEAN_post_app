const jwt=require("jsonwebtoken");


//this class is called wherever we want to check for authorization
module.exports=(req,res,next)=>{

    try{
        
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token,"secret_this_should_be_longer");
        req.userData={
                        email:decodedToken.email,
                        userId:decodedToken.userId
                    }
        next();
    }
    catch(error){
        res.status(401).json({
            message:"You are not aunthenticated!"
        })
    }

};