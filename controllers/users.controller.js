const { User } = require("../models/user.model");

const checkAuthentication = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log("user is..", user);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email not exists!" });
    } else if (user.password === password) {
      // await user
      //   .populate("likedVideos.videoId")
      //   .populate("watchLater.videoId")
      //   .populate("watchHistory.videoId")
      //   .execPopulate();

      return res.status(200).json({
        success: true,
        userId: user._id,
        
      });
    }
    res.status(401).json({ success: false, message: "Password is incorrect" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      userDetails: { email: email, password: password },
      newmsg: "hello",
      errorMessage: err.message,
    });
  }
};

module.exports = checkAuthentication;
