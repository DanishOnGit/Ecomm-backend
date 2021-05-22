const {User} = require("../models/user.model")

const getWatchHistoryVideos = async (req, res) => {
    try {
      const result = await User.findOne({}).populate("watchHistory.videoId");
      res
        .status(200)
        .json({ success: true, watchHistoryVideos: result.watchHistory });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Could not fetch your watchHistory videos",
        errMessage: err.message,
      });
    }
  }

  const addVideoToWatchHistory = async (req, res) => {
    try {
      const userAndVideoDetails = req.body;
      const result = await User.findOne({ _id: userAndVideoDetails.userId });

      if (
        result.watchHistory.find(
          (item) => item.videoId == userAndVideoDetails.videoId
        )
      ) {
        result.watchHistory = result.watchHistory.filter(
          (item) => item.videoId !== userAndVideoDetails.videoId
        );
      } else {
        result.watchHistory.push({
          videoId: userAndVideoDetails.videoId,
          addedAt: new Date().toDateString(),
        });
      }

      const savedItem = await result.save();
      const user = await savedItem
        .populate({ path: "watchHistory.videoId" })
        .execPopulate();

      res
        .status(201)
        .json({ success: true, watchHistoryVideos: user.watchHistory });
    } catch (err) {
      console.log("error..", err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch req",
        errMessage: err.message,
      });
    }
  }

  module.exports = {getWatchHistoryVideos,addVideoToWatchHistory}