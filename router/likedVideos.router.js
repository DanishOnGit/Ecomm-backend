const express = require("express");
const {
  getLikedVideos,
  addVideoToLikedVideos,
} = require("../controllers/likedVideos.controller");
const router = express.Router();

router.route("/").get(getLikedVideos).post(addVideoToLikedVideos);

module.exports = router;
