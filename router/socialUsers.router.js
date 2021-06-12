const express = require("express");
const { getAllPosts, getAllPostsByUser } = require("../controllers/posts.controller");
const { createUserInSocialAndUsers, createUserInSocial,checkAuthenticationSocial, checkUserShuttleArcCredentials, getBasicUserDetails, editBasicUserDetails, updateFollowersAndFollowingList, getFollowersAndFollowingList, getUserProfile} = require("../controllers/socialUsers.controller");
const authenticationVerification = require("../middlewares/authentication-verification");
const { SocialUser } = require("../models/user-sm.model");
const router =  express.Router();

router.route("/login").post(checkAuthenticationSocial)

router.route("/shuttlearc-login-authentication").post(checkUserShuttleArcCredentials)

router.route("/shuttlearc-signup").post(createUserInSocial)

router.route("/signup").post(createUserInSocialAndUsers)

router.route("/profile").get(authenticationVerification,getBasicUserDetails).post(authenticationVerification,editBasicUserDetails)

router.route("/following").get(authenticationVerification,getFollowersAndFollowingList).post(authenticationVerification,updateFollowersAndFollowingList);

router.param("userName",async (req,res,next,userName)=>{
    try{
       const socialUser = await SocialUser.findOne({userName});
       if(socialUser){
           req.socialUser = socialUser
           next();
       }
    }catch(error){
        console.log(error)
    }
})
router.route("/:userName/profile").post(authenticationVerification,getUserProfile)

module.exports=router