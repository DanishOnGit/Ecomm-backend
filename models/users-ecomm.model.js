const mongoose = require("mongoose");
const {Schema}  =mongoose;

const EcommUserSchema = new Schema({
    name: {
        type: String,
        required: "First name is required!",
      },
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
})

const EcommUser = mongoose.model("EcommUser",EcommUserSchema);

module.exports = {EcommUser}