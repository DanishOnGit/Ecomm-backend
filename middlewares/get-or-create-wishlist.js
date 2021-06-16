const { WishlistItem } = require("../models/wishlist.model");

const getOrCreateWishlist = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await WishlistItem.findOne({ userId });
    if (!result) {
      const NewWishlist = new WishlistItem({ userId, wishlistItems: [] });
      await NewWishlist.save();
      req.wishlist = NewWishlist;
      return next();
    }
    req.wishlist = result;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = getOrCreateWishlist;
