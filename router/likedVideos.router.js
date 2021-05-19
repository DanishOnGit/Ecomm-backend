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
      console.log({ userAndVideoDetails });
      const result = await User.findOne({ _id: userAndVideoDetails.userId });
      console.log({ result });
      if (
        result.likedVideos.find(
          (item) => item.videoId == userAndVideoDetails.videoId
        )
      ) {
        result.likedVideos = result.likedVideos.filter(
          (item) => item.videoId !== userAndVideoDetails.videoId
        );
      } else {
        console.log("enetered Else..");
        result.likedVideos.push({
          videoId: userAndVideoDetails.videoId,
          createdAt: new Date().toDateString(),
        });
      }

      console.log("Trying to populate...");

      const savedItem = await result.save();
      const user = await savedItem
        .populate({ path: "likedVideos.videoId" })
        .execPopulate();

      console.log("Is populated?");
      res.status(201).json({ success: true, likedVideos: user.likedVideos });
    } catch (err) {
      console.log("error..", err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch req",
        errMessage: err.message,
      });
    }
  });

module.exports = router;
