const { WatchHistoryVideo } = require("../models/watchHistoryVideos.model")

const getOrCreateWatchHistoryVideosList = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await WatchHistoryVideo.findOne({ userId });
    if (!result) {
      const NewWatchHistoryVideosList = new WatchHistoryVideo({ userId, videoList: [] });
      await NewWatchHistoryVideosList.save();
      req.watchHistoryVideos = NewWatchHistoryVideosList;
      return next();
    }
    req.watchHistoryVideos = result;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = getOrCreateWatchHistoryVideosList;