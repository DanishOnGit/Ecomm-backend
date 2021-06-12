const { SocialUser } = require("../models/user-sm.model");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Post } = require("../models/post.model");
const mySecret = process.env.JWT_KEY;

const createUserInSocialAndUsers = async (req, res) => {
  try {
    const userData = req.body;
    console.log({ userData });
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
      errorMessage: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // const { userId } = req;
    const userDetails = req.body;
    const {userName} = req.params
    console.log({userDetails,userName})
    const user = await User.findById(userDetails.userId._id);
    const socialUser = await SocialUser.findOne({userName});
    const posts = await Post.find({userId:socialUser._id})
    // const socialUser = await SocialUser.findById( userDetails.userId._id );
    console.log(user,socialUser)
    res.status(200).json({success:true,name:user.name,socialUser,posts})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getBasicUserDetails = async (req, res) => {
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
      errorMessage: error.message,
    });
  }
};

const editBasicUserDetails = async (req, res) => {
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
      errorMessage: error.message,
    });
  }
};

const getFollowersAndFollowingList = async (req, res) => {
  try {
    const { userId } = req;
    const socialUser = await SocialUser.findOne({ userId });
    if (socialUser) {
      return res.status(200).json({
        success: true,
        followers: socialUser.followers,
        following: socialUser.following,
      });
    }
    res
      .status(404)
      .json({
        success: false,
        message: "User's Social media profile not exists!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const updateFollowersAndFollowingList = async (req, res) => {
  try {
    const { userId } = req;
    const userDetails = req.body;
    //Add user to my following list
    const socialUser = await SocialUser.findOne({ userId });
    if (
      socialUser.following.find((id) => id == userDetails.userId.toString())
    ) {
      socialUser.following.filter((id) => id != userDetails.userId.toString());
    } else {
      socialUser.following.unshift(userDetails.userId);
    }
    await socialUser.save();

    //Add me to user's followers list
    const user = await SocialUser.findById(userDetails.userId);
    if (user && user.followers.find((id) => id == socialUser._id.toString())) {
      user.followers.filter((id) => id != socialUser._id.toString());
    } else {
      user.followers.unshift(socialUser._id);
    }
    await user.save();

    res.status(201).json({ success: true, idFollowed: userDetails.userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
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
  getBasicUserDetails,
  editBasicUserDetails,
  getFollowersAndFollowingList,
  updateFollowersAndFollowingList,
};
