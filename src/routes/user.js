const express=require("express");
const { userAuth } = require("../middleware/auth");
const userRouter=express.Router();

userRouter.get("/user/profile",userAuth,(req,res)=>{
 
    try {
        const logedinUser=req.user;
        
        
    } catch (error) {
        res.status(400).send("error in catch"+error.message);
    }
})


module.exports={
    userRouter,
}