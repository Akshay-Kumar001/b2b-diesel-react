const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
phone: {
  type: String,
},
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpire: {
    type: Date,
  },
  shippingAddress: {
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String
}
});

const User = mongoose.model("User", userSchema);

module.exports = User;