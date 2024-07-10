const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

module.exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userToken = jwt.sign({ id: user._id, firstName: user.firstName, isAdmin: user.isAdmin }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken, { httpOnly: true }).json({ msg: "success!", user });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.registerAdmin = async (req, res) => {
  try {
    const user = await User.create({ ...req.body, isAdmin: true });
    const userToken = jwt.sign({ id: user._id, firstName: user.firstName, isAdmin: user.isAdmin }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken, { httpOnly: true }).json({ msg: "success!", user });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("email not found");
  }

  const correctPassword = await bcrypt.compare(req.body.password, user.password);
  if (!correctPassword) {
    return res.status(400).json("password didn't match!");
  }

  const userToken = jwt.sign({ id: user._id, firstName: user.firstName, isAdmin: user.isAdmin }, process.env.FIRST_SECRET_KEY);
  return res.cookie("usertoken", userToken, { httpOnly: true }).json({ msg: "success!", user });
};

module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.sendStatus(200);
};

module.exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(500).json({ message: "User update failed" });
  }
};

module.exports.checkAuth = (req, res) => {
  const token = req.cookies.usertoken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.FIRST_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      res.status(200).json({ msg: "Authorized", user: decoded });
    }
  });
};
