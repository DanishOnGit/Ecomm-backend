const express = require("express");
const { getWishlistItems, updateWishlist } = require("../controllers/wishlist.controller");
const router = express.Router();
const getOrCreateWishlist = require("../middlewares/get-or-create-wishlist");

router.use(getOrCreateWishlist);

router
  .route("/")
  .get(getWishlistItems)
  .post(updateWishlist);

module.exports = router;
