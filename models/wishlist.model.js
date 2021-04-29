const mongoose = require("mongoose");
const { Product } = require("./product.model");

const wishlistSchema = new mongoose.Schema({
  wishlistItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      existsInWishlist: Boolean,
    },
  ],
});

const WishlistItem = mongoose.model("WishlistItem", wishlistSchema);

module.exports = { WishlistItem };
