const express = require("express");
const {
  getWatchHistoryVideos,
  addVideoToWatchHistory,
} = require("../controllers/watchHistory.controller");
const router = express.Router();


router.route("/").get(getWatchHistoryVideos).post(addVideoToWatchHistory);

module.exports = router;
