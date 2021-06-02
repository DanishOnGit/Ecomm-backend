const { User } = require("../models/user.model");

const getLikedVideos = async (req, res) => {
  try {
    const result = await User.findOne({}).populate("likedVideos.videoId");
    res.status(200).json({ success: true, likedVideos: result.likedVideos });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not fetch your Liked videos",
      errMessage: err.message,
    });
  }
};

const addVideoToLikedVideos = async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    const result = await User.findById(userId);
    if (result.likedVideos.find((item) => item.videoId == videoId)) {
      result.likedVideos = result.likedVideos.filter(
        (item) => item.videoId !== videoId
      );
    } else {
      result.likedVideos.push({
        videoId: videoId,
        addedAt: new Date().toDateString(),
      });
    }

    const savedItem = await result.save();
    const user = await savedItem
      .populate({ path: "likedVideos.videoId" })
      .execPopulate();

    res.status(201).json({ success: true, likedVideos: user.likedVideos });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch request",
      errMessage: err.message,
    });
  }
};

module.exports = { getLikedVideos, addVideoToLikedVideos };
