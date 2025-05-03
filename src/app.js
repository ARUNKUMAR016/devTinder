const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database.js");
const { User } = require("./models/userModel.js");
const { validatorSignup } = require("./utils/validation.js");
const jwt = require("jsonwebtoken");
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

//find all
app.get("/signup", async (req, res) => {
  // const reqEmail = req.body.email;

  const find = await User.find({});
  res.send(find);
});

//find by id
app.get("/signup", async (req, res) => {
  const reqEmail = req.body.email;

  const find = await User.find({ email: reqEmail });
  res.send(find);
});

//delete by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findByIdAndDelete(userId);

  res.send("deleted the collection");
});

//update

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  const updateUser = await User.findOneAndUpdate({ _id: userId }, data);
  res.send("updated complete");
});

//authenticate

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user is not in the data");
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (passwordValid) {
    const payload = { userId: user.id, email: user.email };
    const secretKey = "MYsec";
    const token = jwt.sign(payload, secretKey);
    res.cookie("token", token);
    console.log(token);
    res.send("login successfull");
  } else {
    throw new Error("login Failed");
  }
});

app.get("/profile", async (req, res) => {
  try {
    //geting cookies
    const cookies = req.cookies;
    const { token } = cookies;


     //check token has cookies or not
    if (!token) {
      return res.status(401).send("No token provided");
    }
    

    //checking cookies has correct code and extract userid
    const decodedMsg = await jwt.verify(token, "MYsec");
    const { userId } = decodedMsg;
  //  const decodedMsg = await jwt.verify(token, "MYsec");
   // console.log("Decoded JWT:", decodedMsg);
    
  //  console.log(_id);

   // If you're going to fetch user, uncomment and use the lines below
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);

    res.send("Token is valid and user ID is: " + _id); // temporary success response
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
