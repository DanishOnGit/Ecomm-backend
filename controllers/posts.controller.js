const { Post } = require("../models/post.model");
const { SocialUser } = require("../models/user-sm.model");

const modifyPost = (post, user) => {
  post._doc.isLikedByUser = post.likedBy.includes(user._id);
  post.updatedAt = undefined;
  post.__v = undefined;
  post.likedBy = undefined;
  return post;
};
const getAllPostsByUser = async (req, res) => {
  try {
    const socialUser = req.socialUser;
    const result = await Post.find({ userId: socialUser._id }).populate({
      path: "userId",
      select: "userName userId",
      populate: { path: "userId", select: "name" },
    });
    res.status(200).json({ success: true, posts: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: err.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { userId } = req;
    const user = await SocialUser.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    let posts = await Post.find({})
      .populate({
        path: "userId",
        select: "userName userId",
        populate: { path: "userId", select: "name" },
      })
      .sort({ createdAt: -1 });

    posts = posts.map((post) => modifyPost(post, user));

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const postContent = req.body;
    const { userId } = req;
    const user = await SocialUser.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }
    let NewPost = new Post(postContent);
    await NewPost.save();
    await NewPost.populate({
      path: "userId",
      select: "userName userId",
      populate: { path: "userId", select: "name" },
    }).execPopulate();

    NewPost = modifyPost(NewPost, user);

    res.status(201).json({ success: true, post: NewPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const user = await SocialUser.findOne({ userId });
    let post = await Post.findById(postId);

    const isAlreadyLikedByUser = post.likedBy.find(
      (id) => id == user._id.toString()
    );

    if (isAlreadyLikedByUser) {
      post.likedBy = post.likedBy.filter((id) => id != user._id.toString());
    } else {
      post.likedBy.unshift(user._id);
    }
    await post.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = { getAllPosts, getAllPostsByUser, createPost, updatePost };
