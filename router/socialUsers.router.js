const express = require("express");
const {
  createUserInSocialAndUsers,
  createUserInSocial,
  checkAuthenticationSocial,
  checkUserShuttleArcCredentials,
  getBasicUserDetails,
  editBasicUserDetails,
  updateFollowersAndFollowingList,
  getFollowersAndFollowingList,
  getUserProfile,
  getAllSocialUsers,
} = require("../controllers/socialUsers.controller");
const authenticationVerification = require("../middlewares/authentication-verification");
const { SocialUser } = require("../models/user-sm.model");
const router = express.Router();

router.route("/").get(authenticationVerification, getAllSocialUsers);

router.route("/login").post(checkAuthenticationSocial);

router
  .route("/shuttlearc-login-authentication")
  .post(checkUserShuttleArcCredentials);

router.route("/shuttlearc-signup").post(createUserInSocial);

router.route("/signup").post(createUserInSocialAndUsers);

router
  .route("/profile")
  .get(authenticationVerification, getBasicUserDetails)
  .post(authenticationVerification, editBasicUserDetails);

router
  .route("/following")
  .get(authenticationVerification, getFollowersAndFollowingList)
  .post(authenticationVerification, updateFollowersAndFollowingList);

  
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
  .get(authenticationVerification, getUserProfile);

module.exports = router;
