const express = require("express");
const {
  getWatchHistoryVideos,
  updateWatchHistory,
} = require("../controllers/watchHistory.controller");
const getOrCreateWatchHistoryVideosList = require("../middlewares/get-or-create-watch-history-videos-list");
const router = express.Router();

router.use(getOrCreateWatchHistoryVideosList);

router.route("/").get(getWatchHistoryVideos).post(updateWatchHistory);

module.exports = router;
