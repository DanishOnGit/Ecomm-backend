const express = require("express");
const { addNewUser } = require("../controllers/users-ecomm.controller");
const { checkUserAuthentication} = require("../controllers/users-ecomm.controller");
const router = express.Router();

router.route("/").post(addNewUser);
router.route("/authenticate").post(checkUserAuthentication);

module.exports = router
