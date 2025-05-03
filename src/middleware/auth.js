const jwt=require("jsonwebtoken");
const { User } = require("../models/userModel");

const userAuth =async (req, res, next) => {
  const cookies=req.cookies;
  const {token}=cookies;
  if(!token)
  {
    throw new Error("token is invalid..");
  }
  const decodeMsg= jwt.verify(token,"MYsec");
  const {userId}=decodeMsg;

  const user=await User.findById(userId);
  if(!user)
  {
    throw new Error("user is not in the data");
  }
  req.user=user;
  next();
};

module.exports = {
  userAuth,
};
