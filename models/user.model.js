const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // name:{
    //   type: String,
    //   required: "First name is required!"
    // },
    email: {
      type: String,
      unique: "This email already exists!",
      required: "Email id is required!",
      validate: function (userEmail) {
        return /^.+@.+\.com$/.test(userEmail);
      },
    },
    password: {
      type: String,
      required: "password is required",
      validate: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
          value
        );
      },
    },
    //  createdAt: {
    //   type: Date,
    //   default: Date.now()
    // }
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
