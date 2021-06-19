const { Notification } = require("../models/notification.model");
const { SocialUser } = require("../models/user-sm.model");

const getNotifications = async (req, res) => {
  try {
    const { userId } = req;
    const socialUser = await SocialUser.findOne({ userId });
    const notifications = await Notification.find({
      notifyTo: socialUser._id,
    }).populate({
      path: "actionByUserId",
      select: "userId userName",
      populate: { path: "userId", select: "name" },
    });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const addToLikeNotifications = async (actionDetails) => {
  try {
    
    const { actionByUserId, postId, notifyTo, isLiked } = actionDetails;
    if (actionByUserId.toString() == notifyTo.toString()) {
      return;
    }
    if (isLiked) {
      
      const newNotification = new Notification({
        ...actionDetails,
        typeOfAction: "Like",
        notificationTitle: "liked your post!",
      });
      await newNotification.save();
      return;
    }
    const notification = await Notification.findOne({
      postId,
      actionByUserId,
      typeOfAction: "Like",
    });
    await notification.remove();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const addToFollowNotifications = async (actionDetails) => {
  try {
    console.log("trying to follow user", actionDetails);
    const { actionByUserId, notifyTo, isFollowed } = actionDetails;
    if (actionByUserId.toString() == notifyTo.toString()) {
      return;
    }
    if (isFollowed) {
      console.log("trying to add to like notificatiomns");
      const newNotification = new Notification({
        ...actionDetails,
        typeOfAction: "Follow",
        notificationTitle: "followed you!",
      });
      await newNotification.save();
      return;
    }
    const notification = await Notification.findOne({
      actionByUserId,
      typeOfAction: "Follow",
      notifyTo,
    });
    await notification.remove();
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
  getNotifications,
  addToLikeNotifications,
  addToFollowNotifications,
};
