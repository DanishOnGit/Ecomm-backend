const { Address } = require("../models/address.model");

const getUsersAddresses = async (req, res) => {
  try {
    const { userId } = req;
    const userAdresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses: userAdresses });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch your cart",
      errMessage: err.message,
    });
  }
};

const createNewAddress = async (req, res) => {
  try {
    const { userId } = req;
    const addressDetails = req.body;
    const newAddress = new Address({ userId, ...addressDetails });
    await newAddress.save();
    res
      .status(201)
      .json({ success: true, message: "Address saved successfully.",newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      errMessage: error.message,
    });
  }
};

module.exports = { getUsersAddresses, createNewAddress };
