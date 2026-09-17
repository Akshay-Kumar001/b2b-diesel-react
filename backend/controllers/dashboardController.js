const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    const orders = await Order.find({
      status: { $ne: "cancelled" },
    });

    const revenue = orders.reduce(
      (total, order) => total + order.total,
      0
    );

    res.json({
      products: productCount,
      users: userCount,
      orders: orderCount,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};