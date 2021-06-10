const express = require("express");
const { createUserInSocialAndUsers, createUserInSocial,checkAuthenticationSocial, checkUserShuttleArcCredentials} = require("../controllers/socialUsers.controller");
const router =  express.Router();

router.route("/login").post(checkAuthenticationSocial)

router.route("/shuttlearc-login-authentication").post(checkUserShuttleArcCredentials)

router.route("/shuttlearc-signup").post(createUserInSocial)

router.route("/signup").post(createUserInSocialAndUsers)


module.exports=router