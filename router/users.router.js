const express = require("express");
const router = express.Router();
const {
  createNewUser,
  checkAuthentication,
} = require("../controllers/users.controller");

router.route("/").post(createNewUser);

router.route("/authenticate").post(checkAuthentication);

module.exports = router;
