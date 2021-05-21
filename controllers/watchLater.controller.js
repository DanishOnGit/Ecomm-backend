const {User} = require("../models/user.model")


const getWatchLaterVideos = async (req, res) => {
    try {
      const result = await User.findOne({}).populate("watchLater.videoId");
      res
        .status(200)
        .json({ success: true, watchLaterVideos: result.watchLater });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not fetch your watchlater videos",
        errMessage: err.message,
      });
    }
  };


const addVideoToWatchLater = async (req, res) => {
    try {
      const userAndVideoDetails = req.body;
      const result = await User.findOne({ _id: userAndVideoDetails.userId });

      if (
        result.watchLater.find(
          (item) => item.videoId == userAndVideoDetails.videoId
        )
      ) {
        result.watchLater = result.watchLater.filter(
          (item) => item.videoId !== userAndVideoDetails.videoId
        );
      } else {
        result.watchLater.push({
          videoId: userAndVideoDetails.videoId,
          createdAt: new Date().toDateString(),
        });
      }

      const savedItem = await result.save();
      const user = await savedItem
        .populate({ path: "watchLater.videoId" })
        .execPopulate();

      res
        .status(201)
        .json({ success: true, watchLaterVideos: user.watchLater });
    } catch (err) {
      console.log("error..", err);
      res.status(500).json({
        success: false,
        message: "Unable to fetch req",
        errMessage: err.message,
      });
    }
  }

  module.exports = {getWatchLaterVideos,addVideoToWatchLater}