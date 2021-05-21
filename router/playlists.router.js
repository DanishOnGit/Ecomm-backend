const express = require("express");

const {
  getPlaylistByIdFromDb,
  addNewPlaylist,
  updatePlaylistDetails,
  deletePlaylist,
  addVideoToPlaylist,
} = require("../controllers/playlists.controller");
const router = express.Router();

router.param("playlistId", getPlaylistByIdFromDb);

router.route("/").post(addNewPlaylist);

router.route("/:playlistId").post(updatePlaylistDetails).delete(deletePlaylist);

router.route("/:playlistId/videos").post(addVideoToPlaylist);

module.exports = router;
