const express = require("express");
const router = express.Router();
const { getCartItems, updateCart } = require("../controllers/cart.controller");
const getOrCreateCart = require("../middlewares/get-or-create-cart");

router.use(getOrCreateCart);

router
  .route("/")
  .get(getCartItems)
  .post(updateCart);

module.exports = router;
