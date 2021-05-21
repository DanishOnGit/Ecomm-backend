const express = require("express");
const {
  addVideoToWatchLater,
  getWatchLaterVideos,
} = require("../controllers/watchLater.controller");
const router = express.Router();

router.route("/").get(getWatchLaterVideos).post(addVideoToWatchLater);

module.exports = router;
