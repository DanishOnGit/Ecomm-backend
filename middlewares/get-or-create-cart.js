const { CartItem } = require("../models/cart.model");

async function getOrCreateCart(req, res, next) {
  try {
    const { userId } = req;
    const result = await CartItem.findOne({ userId });
    if (!result) {
      const NewCart = new CartItem({ userId, cartItems: [] });
      await NewCart.save();
      req.cart = NewCart;
      return next();
    }
    req.cart = result;
    next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = getOrCreateCart;
