const express = require("express");
const router = express.Router();

router.route("/").post(createNewQuiz)


module.exports = router