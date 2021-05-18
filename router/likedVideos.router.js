const express = require("express");
const router = express.Router();
const { LikedVideos } = require("../models/likedVideos.model");
const { User } = require("../models/user.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      // const currentUser = await User.findById({ _id: userId }).populate("byId");
      const likedVideos = await LikedVideos.findOne({}).populate("videoId");
      res.status(200).json({ success: true, likedVideos });
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
      const passedVideo = req.body;
      console.log({ passedVideo });
      const result = await User.findOne({ _id: passedVideo._id });
      res.json({success:true,result})
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to fetch req",
          errMessage: err.message,
        });
    }
  });

module.exports = router;
