const express = require("express");
const { createUserInSocialAndUsers, createUserInSocial,checkAuthenticationSocial, checkUserShuttleArcCredentials, getUserProfile, editUserProfile} = require("../controllers/socialUsers.controller");
const authenticationVerification = require("../middlewares/authentication-verification");
const router =  express.Router();

router.route("/login").post(checkAuthenticationSocial)

router.route("/shuttlearc-login-authentication").post(checkUserShuttleArcCredentials)

router.route("/shuttlearc-signup").post(createUserInSocial)

router.route("/signup").post(createUserInSocialAndUsers)

router.route("/profile").get(authenticationVerification,getUserProfile).post(authenticationVerification,editUserProfile)

module.exports=router