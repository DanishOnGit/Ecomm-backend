const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  addNewVideo,
  getVideoByIdFromDb,
  getVideoDetails,
} = require("../controllers/videos.controller");

router.route("/").get(getAllVideos).post(addNewVideo);

router.param("videoId", getVideoByIdFromDb);

router.route("/:videoId").get(getVideoDetails);

module.exports = router;
