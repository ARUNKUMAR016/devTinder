const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    about: {
      type: String,
      default: "default about",
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const payload = { userId: user.id, email: user.email };
  const secretKey = "MYsec";
  const token = jwt.sign(payload, secretKey);

  return token;
};

userSchema.methods.validatePassword = async function (passwordby) {
  const user = this;
  const hashPass = user.password;
  const passwordValid = await bcrypt.compare(passwordby, hashPass);

  return passwordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
