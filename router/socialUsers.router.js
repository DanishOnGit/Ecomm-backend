const express = require("express");
const { createNewUser, findAndCreateUser } = require("../controllers/users-social.controller");
const { checkAuthentication } = require("../controllers/users.controller");
const router =  express.Router();

router.route("/signup").post(createNewUser)
router.route("/shuttlearc-signup").post(findAndCreateUser)
router.route("/shuttlearc-signup/authentication").post(checkAuthentication)

module.exports=router