const express = require("express");
const cors=require("cors");

const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database.js");

const { validatorSignup } = require("./utils/validation.js");

const { userAuth } = require("./middleware/auth.js");
const { authRouter } = require("./routes/auth.js");
const { viewRouter } = require("./routes/view.js");
const { connecRouter } = require("./routes/connectionReq.js");
const { userRouter } = require("./routes/user.js");
const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());



app.use("/",authRouter);
app.use("/",viewRouter);
app.use("/",connecRouter);
app.use("/",userRouter);




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
