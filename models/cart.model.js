const mongoose = require("mongoose");
const { Product } = require("./product.model");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      existsInCart: Boolean,
      cartQuantity: Number,
    },
  ],
});

const CartItem = mongoose.model("CartItem", cartSchema);

module.exports = { CartItem };
