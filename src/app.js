const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database.js");
const { User } = require("./models/userModel.js");
const { validatorSignup } = require("./utils/validation.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth.js");
const app = express();

app.use(express.json());
app.use(cookieParser());

//insert
app.post("/signup", async (req, res) => {
  //validate

  //encrypt

  try {
    //validate
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

app.post("/sendreq",userAuth,(req,res)=>{
   res.send("middleware working");
});




app.post("/login", async (req, res) => {
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
    res.send("login successfull");
  } else {
    throw new Error("login Failed");
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);

    //  res.send("Token is valid and user ID is: " + _id); // temporary success response
  } catch (error) {
    console.error(error); // helps debugging
    res.status(400).send("Error in token validation");
  }
});

connectDb()
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("fail");
  });
