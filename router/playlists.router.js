const express = require("express");
const { extend } = require("lodash");
const { Playlist } = require("../models/playlist.model");
const { User } = require("../models/user.model");
const router = express.Router();
const { Video } = require("../models/video.model");

router.route("/").post(async (req, res) => {
  try {
    const playlistData = req.body;
    const NewPlaylist = new Playlist(playlistData);
    const createdPlaylist = await NewPlaylist.save();
    res.status(201).json({
      success: true,
      message: "Playlist created successfully.",
      playlist: createdPlaylist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
});
router.route("/:playlistId").post(async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlistsUpdates = req.body;
    let playlistFromDb = await Playlist.findById(playlistId);
    playlistFromDb = extend(playlistFromDb, playlistsUpdates);
    playlistFromDb = await playlistFromDb.save();
    const updatedPlaylist = await playlistFromDb.populate("listVideos.videoId");
    res.status(200).json({ success: true, updatedPlaylist });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
});

module.exports = router;
