const express = require("express");
const {
  getLikedVideos,
  updateLikedVideos,
} = require("../controllers/likedVideos.controller");
const getOrCreateLikedVideosList = require("../middlewares/get-or-create-liked-videos-list");
const router = express.Router();

router.use(getOrCreateLikedVideosList)

router.route("/").get(getLikedVideos).post(updateLikedVideos);

module.exports = router;
