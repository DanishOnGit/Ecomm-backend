const express = require("express");

const {
  getPlaylistByIdFromDb,
  addNewPlaylist,
  updatePlaylistDetails,
  deletePlaylist,
  updatePlaylistVideos,
  getUserPlaylists
} = require("../controllers/playlists.controller");

const router = express.Router();

router.param("playlistId", getPlaylistByIdFromDb);

router.route("/").get(getUserPlaylists).post(addNewPlaylist);

router.route("/:playlistId").post(updatePlaylistDetails).delete(deletePlaylist);

router.route("/:playlistId/videos").post(updatePlaylistVideos);

module.exports = router;
