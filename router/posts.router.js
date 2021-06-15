const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
} = require("../controllers/posts.controller");
const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:postId").post(updatePost);

module.exports = router;
