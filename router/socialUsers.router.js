const express = require("express");
const { getNotifications } = require("../controllers/notification.controller");
const {
  createUserInSocialAndUsers,
  createUserInSocial,
  checkAuthenticationSocial,
  checkUserShuttleArcCredentials,
  getBasicUserDetails,
  editBasicUserDetails,
  updateFollowersAndFollowingList,
  getFollowingList,
  getUserProfile,
  getAllSocialUsers,
  getFollowersList,
} = require("../controllers/socialUsers.controller");
const authenticationVerification = require("../middlewares/authentication-verification");
const { SocialUser } = require("../models/user-sm.model");
const router = express.Router();

router.route("/login").post(checkAuthenticationSocial);

router
  .route("/shuttlearc-login-authentication")
  .post(checkUserShuttleArcCredentials);

router.route("/shuttlearc-signup").post(createUserInSocial);

router.route("/signup").post(createUserInSocialAndUsers);




router.use(authenticationVerification)

router.route("/").get( getAllSocialUsers);

router
  .route("/profile")
  .get( getBasicUserDetails)
  .post( editBasicUserDetails);

router
  .route("/notifications")
  .get( getNotifications);

router
  .route("/following")
  .get( getFollowingList)
  .post( updateFollowersAndFollowingList);

router.route("/followers").get( getFollowersList);

router.param("userName", async (req, res, next, userName) => {
  try {
    const socialUser = await SocialUser.findOne({ userName }).populate({
      path: "userId",
      select: "name",
    });
    if (socialUser) {
      req.socialUser = socialUser;
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

router
  .route("/:userName/profile")
  .get( getUserProfile);

module.exports = router;
