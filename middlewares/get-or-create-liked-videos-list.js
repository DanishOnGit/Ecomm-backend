const { LikedVideo } = require("../models/likedVideos.model");

const getOrCreateLikedVideosList = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await LikedVideo.findOne({ userId });
    if (!result) {
      const NewLikedVideoList = new LikedVideo({ userId, videoList: [] });
      await NewLikedVideoList.save();
      req.likedVideos = NewLikedVideoList;
      return next();
    }
    req.likedVideos = result;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = getOrCreateLikedVideosList;
