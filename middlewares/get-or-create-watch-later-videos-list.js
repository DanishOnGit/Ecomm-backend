const { WatchLaterVideo } = require("../models/watchLaterVideos.model")

const getOrCreateWatchLaterVideosList = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await WatchLaterVideo.findOne({ userId });
    if (!result) {
      const NewWatchLaterVideosList = new WatchLaterVideo({ userId, videoList: [] });
      await NewWatchLaterVideosList.save();
      req.watchLaterVideos = NewWatchLaterVideosList;
      return next();
    }
    req.watchLaterVideos = result;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = getOrCreateWatchLaterVideosList;