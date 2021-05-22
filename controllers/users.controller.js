const { User } = require("../models/user.model");

const createNewUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });

    if (user) {
      res.status(409).json({
        success: false,
        message: "User Already exists with this email id. ",
      });
      return;
    }

    const NewUser = new User(userData);
    const createdUser = await NewUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
};

const checkAuthentication = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");

    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email not exists!" });
    } else if (user.password === password) {
      return res.status(200).json({
        success: true,
        userId: user._id,
      });
    }
    res.status(401).json({ success: false, message: "Password is incorrect" });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      userDetails: { email: email, password: password },
      newmsg: "hello",
      errorMessage: err.message,
    });
  }
};

const getUserFromDb = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    await user
      .populate("likedVideos.videoId")
      .populate("watchLater.videoId")
      .populate("watchHistory.videoId")
      .execPopulate();

    return res.status(200).json({
      success: true,
      likedVideos: user.likedVideos,
      watchLaterVideos: user.watchLater,
      watchHistoryVideos: user.watchHistory,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
};

const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Playlist.find({ userId }).populate(
      "listVideos.videoId"
    );

    res.status(200).json({ success: true, playlists: result });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Could not fetch your request",
      errMessage: err.message,
    });
  }
};

module.exports = {
  checkAuthentication,
  createNewUser,
  getUserFromDb,
  getUserPlaylists,
};
