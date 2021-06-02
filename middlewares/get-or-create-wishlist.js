const { WishlistItem } = require("../models/wishlist.model");

async function getOrCreateWishlist(req, res, next) {
  try {
    const { userId } = req;
    const result = await WishlistItem.findOne({ userId });
    if (!result) {
      const NewWishlist = new WishlistItem({ userId, wishlistItems: [] });
      console.log({ NewWishlist });
      await NewWishlist.save();
      req.wishlist = NewWishlist;
      return next();
    }
    req.wishlist = result;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = getOrCreateWishlist;
