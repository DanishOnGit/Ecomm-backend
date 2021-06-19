const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { Product } = require("../models/product.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Couldnt fetch request, try again !",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      let NewProduct = await Product.insertMany(product);
      res.json({ success: true, NewProduct });
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({
        success: false,
        message: "Unable to add product!",
        errMessage: err.message,
      });
    }
  });

router.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No Product found associated, please check the user id!",
      });
    }
    req.product = product;
    next();
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Product found associated, please check the user id!",
      errMessage: err.message,
    });
  }
});

router
  .route("/product/:productId")
  .get(async (req, res) => {
    try {
      const { product } = req;
      if (product) {
        product.__v = undefined;
        return res.json({ success: true, product });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not fetch the desired product!",
        errMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      let { product } = req;
      const updateProduct = req.body;
      product = extend(product, updateProduct);
      await product.save();
      res.json({ success: true, product });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not update the desired product!",
        errMessage: err.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { product } = req;
      await product.remove();
      res.json({ success: true, message: "product removed", products });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not delete the desired product!",
        errMessage: err.message,
      });
    }
  });

module.exports = router;
