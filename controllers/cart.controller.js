const { extend } = require("lodash");

const getCartItems = async (req, res) => {
    try {
      const { cart } = req;
      await cart.populate("cartItems.productId").execPopulate();
      res.status(200).json({ success: true, cartItems: cart.cartItems });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Could not fetch your cart",
        errMessage: err.message,
      });
    }
  }

  const updateCart = async (req, res) => {
    try {
      const passedProduct = req.body;
      const { userId, cart } = req;

      if (cart.cartItems.find((item) => item.productId == passedProduct._id)) {
        cart.cartItems = cart.cartItems.map((item) => {
          if (item.productId == passedProduct._id) {
            item = extend(item, passedProduct);
            return item;
          }
          return item;
        });
      } else {
        cart.cartItems.push({
          userId: userId,
          productId: passedProduct._id,
          existsInCart: true,
          cartQuantity: 1,
        });
      }

      const savedItem = await cart.save();
      const cartItem = await savedItem
        .populate("cartItems.productId")
        .execPopulate();

      res.status(201).json({ success: true, cartItems: cart.cartItems });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Could not add to your cart",
        errMessage: err.message,
      });
    }
  }

  module.exports={getCartItems,updateCart}