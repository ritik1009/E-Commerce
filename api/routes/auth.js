const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users')

const users = [];

// Register a user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { username, password } = req.body;
    console.log("requested",req.body)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        isAdmin:false,
        role:'user',
        })
    const user =await newUser.save()
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (e) {
    console.log(e.message);
  }
});


// Login a user
router.post("/login", async (req, res) => {
  try {
    var { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    var{password,updatedAt,...other} = user._doc
    res.status(200).json({ user:other,message: "Logged in successfully", token });
  } catch (e) {
    console.log(e.message);
  }
});





module.exports = router;