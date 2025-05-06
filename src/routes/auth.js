const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel.js");
const { validatorSignup } = require("../utils/validation.js");
const { now } = require("mongoose");
const authRouter = express.Router();

//insert
authRouter.post("/signup", async (req, res) => {
  try {
    validatorSignup(req);
    //encrypt

    const { firstName, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);

    const user = new User({
      firstName,
      email,
      password: hashPass,
    });
    await user.save();
    res.status(201).send({ message: "User inserted successfully!", user });
  } catch (error) {
    res.status(400).send({
      message: "User not inserted due to bad request!",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user is not in the data");
  }
  const passwordValid = await user.validatePassword(password);

  if (passwordValid) {
    const token = await user.getJWT();
    res.cookie("token", token);
    console.log(token);
    res.send(user);
  } else {
    throw new Error("login Failed");
  }
});
authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now() ), // Optional: expires in 1 second
      // Good practice for security
    });
    res.send("logout");
  });
  


module.exports = {
  authRouter,
};
