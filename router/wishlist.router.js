const express = require("express");
const router = express.Router();
const { WishlistItem } = require("../models/wishlist.model");
const { extend } = require("lodash");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const wishlistItems = await WishlistItem.findOne({}).populate(
        "wishlistItems.productId"
      );
      console.log(wishlistItems);
      res.json({ success: true, wishlistItem1: wishlistItems });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Could not fetch your wishlist",
          errMessage: err.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const passedProduct = req.body;

      const result = await WishlistItem.findOne({});

      for (let product of result.wishlistItems) {
        if (product.productId == passedProduct._id) {
          product.existsInWishlist = !product.existsInWishlist;

          let wishlistItem = await result.save();

          wishlistItem = await wishlistItem
            .populate("wishlistItems.productId")
            .execPopulate();

          res.status(200).json({ success: true, wishlistItem });
          return;
        }
      }
      result.wishlistItems.push({
        productId: passedProduct._id,
        existsInWishlist: true,
      });
      const savedItem = await result.save();
      console.log("SAVED ITEM IS...", savedItem);
      const wishlistItem = await savedItem
        .populate("wishlistItems.productId")
        .execPopulate();

      res.status(201).json({ success: true, wishlistItem });
    } catch (err) {
      console.log("error posting...", err);
      res
        .status(500)
        .json({
          success: false,
          message: "Could not add to your wishlist",
          errMessage: err.message,
        });
    }
  });

module.exports = router;
