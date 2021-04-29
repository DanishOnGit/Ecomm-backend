const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  brand: String,
  description: String,
  price: Number,
  weight: Number,
  discount: Number,
  inStock: Boolean,
  fastDelivery: Boolean,
  level: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
