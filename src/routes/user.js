const express = require("express");
const { userAuth } = require("../middleware/auth");
const { ConnectModel } = require("../models/connectionModel");
const userRouter = express.Router();

userRouter.get("/user/profile", userAuth, async (req, res) => {
  try {
    const logedinUser = req.user;

    const data = await ConnectModel.find({
      $or: [
        { toId: logedinUser._id, status: "accept" },
        { fromId: logedinUser._id, status: "accept" },
      ],
    }).populate("fromId", ["firstName", "about"]);

    res.status(200).send(data); // Send the fetched data as response
  } catch (error) {
    res.status(400).send("error in catch: " + error.message);
  }
});

userRouter.get("/user/profile/req", userAuth, async (req, res) => {
    try {
      const logedinUser = req.user;
  
      const data = await ConnectModel.find({
        $or: [
          { toId: logedinUser._id, status: "like" },
          { fromId: logedinUser._id, status: "like" },
        ],
      }).populate("fromId", ["firstName", "about"]);
  
      res.status(200).send(data); // Send the fetched data as response
    } catch (error) {
      res.status(400).send("error in catch: " + error.message);
    }
  });

  userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
        
//own profile not to show
//req send profile or pass profile not show
//connected people not shown

//only new people show


    } catch (error) {
     res.status(400).send(error.message);   
    }
  })

module.exports = {
  userRouter,
};
