const express = require("express");
const router = express.Router();
const {
  createNewUser,
  checkAuthentication,
  getUserFromDb,
  getUserPlaylists,
} = require("../controllers/users.controller");

router.route("/").post(createNewUser);

router.route("/:userId").get(getUserFromDb);

router.route("/:userId/playlists").get(getUserPlaylists);

router.route("/authenticate").post(checkAuthentication);

module.exports = router;
