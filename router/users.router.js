const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const checkAuthentication = require("../controllers/users.controller");

router.route("/").post(async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });

    if (user) {
      res.status(409).json({
        success: false,
        message: "User Already exists with this email id. ",
      });
      return;
    }

    const NewUser = new User(userData);
    const createdUser = await NewUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
});

router.route("/authenticate").post(checkAuthentication);

module.exports = router;
