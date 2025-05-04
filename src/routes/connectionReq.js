const express = require("express");
const { userAuth } = require("../middleware/auth");
const { ConnectModel } = require("../models/connectionModel");

const connecRouter = express.Router();

connecRouter.post("/connect/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUser = req.user._id;
    const status = req.params.status;
    const toUser = req.params.userId;

    const allowedStatus=["like","pass"];
    if(!allowedStatus.includes(status)){
        throw new Error(`stautus is not allowed `+status);
    }

    const existingConnectReq = await ConnectModel.findOne({
        $or: [
          { fromId: fromUser, toId: toUser },
          { fromId: toUser, toId: fromUser }
        ]
      });
      

    if(existingConnectReq)
    {
        throw new Error("data exists");
    }


    const connectReq = new ConnectModel({
      fromId:req.user._id,
      toId:toUser,
      status:status,
    });
    await connectReq.save();
    res.send("yeahhhhhhhh");

    console.log("====================");
    console.log(fromUser._id);
    console.log("====================");
    console.log(status);
    console.log("====================");
    console.log(toUser);
  } catch (error) {
    throw new Error("error" + error);
  }
});

module.exports = {
  connecRouter,
};
