const express = require("express");
const router = express.Router();
const { LikedVideos } = require("../models/likedVideos.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const likedVideos = await LikedVideos.findOne({}).populate(
        "likedVideos.videoId"
      );
      res.status(200).json({ success: true, likedVideos });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Could not fetch your cart",
          errMessage: err.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const passedVideo = req.body;
    } catch (err) {}
  });

module.exports = router;
