const { SocialUser } = require("../models/user-sm.model");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mySecret = process.env.JWT_KEY;

const createUserInSocialAndUsers = async (req, res) => {
  try {
    const userData = req.body;
    console.log({userData})
    const user = await User.findOne({ email: userData.email });
    if (user) {
      res.status(409).json({
        success: false,
        message: "User Already exists with this email id. ",
      });
      return;
    }
    const socialUser = await SocialUser.findOne({
      userName: userData.userName,
    });
    if (socialUser) {
      res.status(409).json({
        success: false,
        message: "User Already exists with this user name.",
      });
      return;
    }
    const NewUser = new User(userData);
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);
    await NewUser.save();
    const NewSocialUser = new SocialUser({ ...userData, userId: NewUser._id });
    await NewSocialUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const createUserInSocial = async (req, res) => {
  try {
    const userDetails = req.body;
    const socialUser = await SocialUser.findOne({
      userName: userDetails.userName,
    });
    if (socialUser) {
      res.status(409).json({
        success: false,
        message: "Username already exists!Try a different user name.",
      });
      return;
    }
    const NewSocialUser = new SocialUser({
      ...userDetails,
      // userId: userDetails.userId,
    });
    await NewSocialUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};
const checkUserShuttleArcCredentials = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(404)
        .json({ success: true, message: "Incorrect email or password" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const checkAuthenticationSocial = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");
    console.log({ email, password });
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email not exists!" });
    }
    const isSocialUser = await SocialUser.findOne({ userId: user._id });

    if (!isSocialUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please Sign up!",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign({ userId: user._id }, mySecret, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        success: true,
        token,
        userId: isSocialUser._id,
        name: user.name,
        userName: isSocialUser.userName,
        bio: isSocialUser.bio,
      });
    }
    res.status(401).json({ success: false, message: "Password is incorrect" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      userDetails: { email: email, password: password },

      errorMessage: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    console.log("usr found", user);
    const socialUser = await SocialUser.findOne({ userId });
    res.status(200).json({
      success: true,
      name: user?.name,
      userName: socialUser?.userName,
      bio: socialUser?.bio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      userDetails: { email: email, password: password },

      errorMessage: error.message,
    });
  }
};

const editUserProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    user.name = updatedData.newName;
    await user.save();
    const socialUser = await SocialUser.findOne({ userId });
    socialUser.userName = updatedData.newUserName;
    socialUser.bio = updatedData.newBio;
    await socialUser.save();
    res
      .status(200)
      .json({
        success: true,
        name: user?.name,
        userName: socialUser?.userName,
        bio: socialUser?.bio,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      userDetails: { email: email, password: password },

      errorMessage: error.message,
    });
  }
};

module.exports = {
  createUserInSocialAndUsers,
  checkAuthenticationSocial,
  createUserInSocial,
  checkUserShuttleArcCredentials,
  getUserProfile,
  editUserProfile,
};
