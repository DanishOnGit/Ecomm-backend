const express = require("express");
const { User } = require("../models/user.model");
const { Playlist } = require("../models/playlist.model");
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
router.route("/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    await user
      .populate("likedVideos.videoId")
      .populate("watchLater.videoId")
      .populate("watchHistory.videoId")
      .execPopulate();

    return res.status(200).json({
      success: true,
      likedVideos: user.likedVideos,
      watchLaterVideos: user.watchLater,
      watchHistoryVideos: user.watchHistory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
});

router.route("/:userId/playlists").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Playlist.find({ userId }).populate(
      "listVideos.videoId"
    );

    res.status(200).json({ success: true, playlists: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch your request",
      errMessage: err.message,
    });
  }
});
router.route("/authenticate").post(checkAuthentication);

module.exports = router;
