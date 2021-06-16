const express = require("express");
const {
  updateWatchLater,
  getWatchLaterVideos,
} = require("../controllers/watchLater.controller");
const getOrCreateWatchLaterVideosList = require("../middlewares/get-or-create-watch-later-videos-list");
const router = express.Router();

router.use(getOrCreateWatchLaterVideosList);

router.route("/").get(getWatchLaterVideos).post(updateWatchLater);

module.exports = router;
