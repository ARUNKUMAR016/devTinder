const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const { validateEditFields, validatePassword } = require("../utils/validation");
const { ConnectModel } = require("../models/connectionModel");

const viewRouter = express.Router();

viewRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);

    //  res.send("Token is valid and user ID is: " + _id); // temporary success response
  } catch (error) {
    console.error(error); // helps debugging
    res.status(400).send("Error in token validation");
  }
});

viewRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      throw new Error("not valid");
    }
    const signedUser = req.user;
    console.log(signedUser);
    Object.keys(req.body).forEach((key) => (signedUser[key] = req.body[key]));
    console.log(signedUser);
    await signedUser.save();
    res.send("updated");
  } catch (err) {
    throw new Error("failed");
  }
});

viewRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    validatePassword(req);

    const { password } = req.body;

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the signed-in user's password
    const signedUser = req.user;
    signedUser.password = hashedPassword;

    // Save to the database
    await signedUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Password update failed");
  }
});

viewRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const logedinUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      const allowedStatus=["accept","reject"];
      if(!allowedStatus.includes(status)){
        return res.status(404).json({message:"not allowed"});
      }

      const connectCollect = await ConnectModel.findOne({
        _id: requestId, // ✅ Fixed field name
        toId: logedinUser._id,
        status: "like",
      });

      if (!connectCollect) {
        return res.status(404).send("Request not found");
      }

      connectCollect.status = status;
      const data = await connectCollect.save();
      console.log("=====" + data + "=======");
      res.send("updated");
    } catch (error) {
      console.error("Error updating request:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);


module.exports = {
  viewRouter,
};
