const express = require("express");
const router = express.Router();
const { CartItem } = require("../models/cart.model");
const { extend } = require("lodash");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const cartItems = await CartItem.findOne({}).populate(
        "cartItems.productId"
      );
      console.log("CART GET IS...", cartItems);
      res.status(200).json({ success: true, cartItem1: cartItems });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Could not fetch your cart",
          errMessage: err.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const passedProduct = req.body;
      console.log("PASSEDpRODUCT IN CART IS....", passedProduct);
      const result = await CartItem.findOne({
        _id: "608ad95812070f029c4ef32b",
      });

      for (let product of result.cartItems) {
        if (product.productId == passedProduct._id) {
          product = extend(product, passedProduct);
          let cartItem = await result.save();
          cartItem = await cartItem
            .populate("cartItems.productId")
            .execPopulate();

          res.status(200).json({ success: true, cartItem });
          return;
        }
      }

      result.cartItems.push({
        productId: passedProduct._id,
        existsInCart: true,
        cartQuantity: 1,
      });

      const savedItem = await result.save();

      const cartItem = await savedItem
        .populate("cartItems.productId")
        .execPopulate();

      res.status(201).json({ success: true, cartItem });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Could not add to your cart",
          errMessage: err.message,
        });
    }
  });

module.exports = router;
