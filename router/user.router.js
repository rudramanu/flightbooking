const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, encrypt) => {
      if (err) {
        res.send("Error", err);
      } else {
        const user = new UserModel({ name, email, password: encrypt });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log(user);
    const hashed_password = user?.password;
    bcrypt.compare(password, hashed_password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "secure");
        res.send({ message: "Logged In Successfully", token });
      } else {
        res.send("Wrong Credentials");
      }
    });
  } catch (error) {
    res.send("Please enter valid Credentials");
  }
});

module.exports = { userRouter };
