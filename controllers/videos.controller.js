const { Video } = require("../models/video.model");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Couldnt fetch request, try again !",
      errorMsg: error.message,
    });
  }
};

const addNewVideo = async (req, res) => {
  try {
    let NewVideo = await Video.insertMany(videos);

    res.json({ success: true, NewVideo });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to add video!",
      errMessage: err.message,
    });
  }
};

const getVideoByIdFromDb = async (req, res, next, id) => {
  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "No video found associated, please check the video id!",
      });
    }
    req.video = video;
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "No video found associated, please check the video id!",
      errorMessage: error.message,
    });
  }
};

const getVideoDetails = async (req, res) => {
  try {
    const { video } = req;
    video.__v = undefined;
    return res.json({ success: true, video });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Could not fetch the desired video!",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getAllVideos,
  addNewVideo,
  getVideoByIdFromDb,
  getVideoDetails,
};
