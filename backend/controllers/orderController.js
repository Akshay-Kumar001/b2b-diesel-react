const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    const order = await Order.create({
      customer: req.user.userId,
      items,
      shippingAddress,
      total: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};
const getMyOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};
const updateMyOrderShipping = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        customer: req.user.userId,
      },
      {
        shippingAddress: {
          name,
          phone,
          address,
          city,
          state,
          pincode,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Shipping address updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update shipping error:", error);

    res.status(500).json({
      message: "Failed to update shipping address",
    });
  }
};

const cancelMyOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user.userId,
    });

    // Check if order exists and belongs to logged-in customer
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Customer can cancel only pending or confirmed orders
    if (order.status !== "pending" && order.status !== "confirmed") {
      return res.status(400).json({
        message: `Order cannot be cancelled when status is ${order.status}`,
      });
    }

    // Change order status to cancelled
    order.status = "cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    res.status(500).json({
      message: "Failed to cancel order",
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderById,
  getAllOrders,
  updateOrderStatus,
  updateMyOrderShipping,
    cancelMyOrder,

};