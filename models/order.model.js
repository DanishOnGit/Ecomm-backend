const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        itemPriceDetails: {
          price: Number,
          discount: Number,
        },
        cartQuantity: Number,
      },
    ],
    orderPriceDetails: {
      totalMrp: Number,
      totalDiscount: { type: Number, default: 0 },
      toBePaid: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };
