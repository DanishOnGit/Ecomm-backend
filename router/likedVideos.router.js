const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await User.findOne({}).populate("likedVideos.videoId");
      res.status(200).json({ success: true, likedVideos: result.likedVideos });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not fetch your cart",
        errMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const userAndVideoDetails = req.body;

      const result = await User.findOne({ _id: userAndVideoDetails.userId });

      if (
        result.likedVideos.find(
          (item) => item.videoId == userAndVideoDetails.videoId
        )
      ) {
        result.likedVideos = result.likedVideos.filter(
          (item) => item.videoId !== userAndVideoDetails.videoId
        );
      } else {
        result.likedVideos.push({
          videoId: userAndVideoDetails.videoId,
          createdAt: new Date().toDateString(),
        });
      }

      const savedItem = await result.save();
      const user = await savedItem
        .populate({ path: "likedVideos.videoId" })
        .execPopulate();

      res.status(201).json({ success: true, likedVideos: user.likedVideos });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch request",
        errMessage: err.message,
      });
    }
  });

module.exports = router;
