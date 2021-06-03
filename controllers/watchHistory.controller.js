const { User } = require("../models/user.model");

const getWatchHistoryVideos = async (req, res) => {
  try {
    const { watchHistoryVideos } = req;
    const result = await watchHistoryVideos
      .populate("videoList.videoId")
      .execPopulate();
    res
      .status(200)
      .json({ success: true, watchHistoryVideos: result.videoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch your watchHistory videos",
      errorMessage: error.message,
    });
  }
};

const updateWatchHistory = async (req, res) => {
  try {
    const { videoId } = req.body;
    const { watchHistoryVideos } = req;

    if (watchHistoryVideos.videoList.find((item) => item.videoId == videoId)) {
      watchHistoryVideos.videoList = watchHistoryVideos.videoList.filter(
        (item) => item.videoId !== videoId
      );
    } else {
      watchHistoryVideos.videoList.push({
        videoId: videoId,
        addedAt: new Date().toDateString(),
      });
    }

    const savedItem = await watchHistoryVideos.save();
    await savedItem.populate("videoList.videoId").execPopulate();

    res
      .status(201)
      .json({
        success: true,
        watchHistoryVideos: watchHistoryVideos.videoList,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch request",
      errorMessage: error.message,
    });
  }
};

module.exports = { getWatchHistoryVideos, updateWatchHistory };
