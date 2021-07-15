const { CartItem } = require("../models/cart.model");
const { Order } = require("../models/order.model");

const emptyCart = async (userId) => {
  const usersCart = await CartItem.findOne({userId});
  usersCart.cartItems = usersCart.cartItems.filter(
    (item) => item.existsInCart === false
  );
  await usersCart.save();
};

const createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const orderDetails = req.body;
    console.log({orderDetails})
    const newOrder = new Order({ ...orderDetails, userId });
    await newOrder.save();

    await emptyCart(userId);

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = { createOrder };
