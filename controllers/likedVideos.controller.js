

const getLikedVideos = async (req, res) => {
  try {
    const { likedVideos } = req;
    const result = await likedVideos
      .populate("videoList.videoId")
      .execPopulate();
    res.status(200).json({ success: true, likedVideos: result.videoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not fetch your Liked videos",
      errorMessage: error.message,
    });
  }
};

const updateLikedVideos = async (req, res) => {
  try {
    const { videoId } = req.body;
    const { likedVideos } = req;

    if (likedVideos.videoList.find((item) => item.videoId == videoId)) {
      likedVideos.videoList = likedVideos.videoList.filter(
        (item) => item.videoId !== videoId
      );
    } else {
      likedVideos.videoList.push({
        videoId: videoId,
        addedAt: new Date().toDateString(),
      });
    }

    const savedItem = await likedVideos.save();
    await savedItem.populate("videoList.videoId").execPopulate();

    res.status(201).json({ success: true, likedVideos: likedVideos.videoList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch request",
      errorMessage: error.message,
    });
  }
};

module.exports = { getLikedVideos, updateLikedVideos };
