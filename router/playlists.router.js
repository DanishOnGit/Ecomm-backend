const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");

router.route("/").get(async (req, res) => {
  try {
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not fetch your request",
        errMessage: err.message,
      });
  }
});

module.exports = router;
