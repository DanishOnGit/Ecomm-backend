const mongoose = require("mongoose");
const { Product } = require("./product.model");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    address: String,
    city: String,
    pincode: Number,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = { Address };
