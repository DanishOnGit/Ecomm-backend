const { SocialUser } = require("../models/user-sm.model");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Post } = require("../models/post.model");
const mySecret = process.env.JWT_KEY;

const getAllSocialUsers = async (req, res) => {
  try {
    const socialUsers = await SocialUser.find({}).populate({
      path: "userId",
      select: "name",
    });
    const updatedSocialUsers = socialUsers.map((user) => {
      user.followers = undefined;
      user.following = undefined;
      user.bio = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      user.__v = undefined;
      return user;
    });

    res.status(200).json({ success: true, updatedSocialUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const createUserInSocialAndUsers = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (userData && user) {
      res.status(409).json({
        success: false,
        status: "error",
        message: "User Already exists with this email id.",
      });
      return;
    }
    const socialUser = await SocialUser.findOne({
      userName: userData.userName,
    });
    if (socialUser) {
      res.status(409).json({
        success: false,
        status: "error",
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

    res.status(201).json({
      success: true,
      status: "success",
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: "error",
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
    if (userDetails && socialUser) {
      res.status(409).json({
        success: false,
        status: "error",
        message: "Username already exists!Try a different user name.",
      });
      return;
    }
    const NewSocialUser = new SocialUser({
      ...userDetails,
    });
    await NewSocialUser.save();
    res.status(201).json({
      success: true,
      status: "success",
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: "error",
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
      return res.status(404).json({
        success: false,
        status: "error",
        message: "Incorrect email or password",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        success: false,
        status: "error",
        message: "Incorrect email or password",
      });
    }
    const socialUser = await SocialUser.findOne({ userId: user._id });
    if (socialUser) {
      return res.status(409).json({
        success: false,
        status: "info",
        message:
          "A ShuttleArc-socials account already exists with these credentials! Try logging in instead.",
        user,
      });
    }
    res.status(200).json({
      success: true,
      status: "success",
      message: "Account verified!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      status: "error",
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const checkAuthenticationSocial = async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        status: "error",
        message: "Email not exists!",
      });
    }
    const isSocialUser = await SocialUser.findOne({ userId: user._id });

    if (!isSocialUser) {
      return res.status(404).json({
        success: false,
        status: "error",
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
        status: "success",
        message: "Login successfull",
        token,
        userId: isSocialUser._id,
        userName: isSocialUser.userName,
      });
    }
    res.status(401).json({
      success: false,
      status: "error",
      message: "Password is incorrect",
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

const getUserProfile = async (req, res) => {
  try {
    const { socialUser } = req;
    const name = socialUser.userId.name;
    socialUser.userId = undefined;
    const posts = await Post.find({ userId: socialUser._id })
      .populate({
        path: "userId",
        select: "userName userId",
        populate: { path: "userId", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, name, socialUser, posts });
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
    const socialUser = await SocialUser.findOne({ userId }).populate({});
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
    res.status(404).json({
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
    console.log({ userDetails });
    //Add user to my following list
    const socialUser = await SocialUser.findOne({ userId });
    if (
      socialUser.following.find((id) => id == userDetails.userId.toString())
    ) {
      console.log("Follow unfollow fiilter working");
      socialUser.following = socialUser.following.filter(
        (id) => id != userDetails.userId.toString()
      );
    } else {
      socialUser.following.unshift(userDetails.userId);
    }
    await socialUser.save();

    //Add me to user's followers list
    const user = await SocialUser.findById(userDetails.userId);
    if (user && user.followers.find((id) => id == socialUser._id.toString())) {
      user.followers = user.followers.filter(
        (id) => id != socialUser._id.toString()
      );
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
  getAllSocialUsers,
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
