const { User } = require("../models/user.model");

const getWatchLaterVideos = async (req, res) => {
  try {
    const { watchLaterVideos } = req;
    const result = await watchLaterVideos
      .populate("videoList.videoId")
      .execPopulate();
    res.status(200).json({ success: true, watchLaterVideos: result.videoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch your watchlater videos",
      errorMessage: error.message,
    });
  }
};

const updateWatchLater = async (req, res) => {
  try {
    const {videoId} = req.body;
    const {watchLaterVideos} = req;
   
    if (
      watchLaterVideos.videoList.find(
        (item) => item.videoId == videoId
      )
    ) {
      watchLaterVideos.videoList = watchLaterVideos.videoList.filter(
        (item) => item.videoId !== videoId
      );
    } else {
      watchLaterVideos.videoList.push({
        videoId: videoId,
        addedAt: new Date().toDateString(),
      });
    }

    const savedItem = await watchLaterVideos.save();
    await savedItem
      .populate( "videoList.videoId")
      .execPopulate();

    res.status(201).json({ success: true, watchLaterVideos:watchLaterVideos.videoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch req",
      errorMessage: error.message,
    });
  }
};

module.exports = { getWatchLaterVideos, updateWatchLater };
