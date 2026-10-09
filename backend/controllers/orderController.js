const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const PaymentAttempt = require("../models/PaymentAttempt");
// Create a new order with Razorpay



const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      return res.status(500).json({
        message: "Razorpay keys are not configured",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    const requiredFields = [
      "name",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    if (
      !shippingAddress ||
      requiredFields.some(
        (field) =>
          typeof shippingAddress[field] !== "string" ||
          !shippingAddress[field].trim()
      )
    ) {
      return res.status(400).json({
        message: "Please provide a complete shipping address",
      });
    }

    const orderItems = [];

    for (const item of items) {
      if (
        !mongoose.isValidObjectId(item.product) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product or quantity",
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          message: "A product in your cart no longer exists",
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const total = Number(
      orderItems
        .reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0
        )
        .toFixed(2)
    );

    const amountInPaise = Math.round(total * 100);

    if (
      !Number.isSafeInteger(amountInPaise) ||
      amountInPaise < 100
    ) {
      return res.status(400).json({
        message: "Invalid order total",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const receipt = `u${req.user.userId}${Date.now()}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
    });

    // Store checkout details separately.
    // This does NOT create an Order document.
    await PaymentAttempt.create({
      customer: req.user.userId,
      razorpayOrderId: razorpayOrder.id,
      items: orderItems,
      total,
      shippingAddress: {
        name: shippingAddress.name.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
      },
      status: "pending",
    });

    return res.status(201).json({
      message: "Payment order created successfully",
      items: orderItems,
      total,
      shippingAddress,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(
      "Create payment order error:",
      error.message
    );

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
};


// verify razorpay payment



const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !/^[a-f0-9]{64}$/i.test(razorpay_signature)
    ) {
      return res.status(400).json({
        message: "Missing or invalid payment details",
      });
    }

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      return res.status(500).json({
        message: "Razorpay keys are not configured",
      });
    }

    // Verify Razorpay's payment signature.
    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest();

    const receivedSignature = Buffer.from(
      razorpay_signature,
      "hex"
    );

    if (
      receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(
        receivedSignature,
        expectedSignature
      )
    ) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // Find the checkout details saved by our backend.
    const attempt = await PaymentAttempt.findOne({
      razorpayOrderId: razorpay_order_id,
      customer: req.user.userId,
    });

    if (!attempt) {
      // A repeated successful verification may already
      // have created the order.
      const existingOrder = await Order.findOne({
        razorpayOrderId: razorpay_order_id,
        customer: req.user.userId,
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      });

      if (existingOrder) {
        return res.json({
          message: "Payment already verified",
          order: existingOrder,
        });
      }

      return res.status(404).json({
        message: "Checkout session not found",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Confirm the payment and amount directly with Razorpay.
    const [razorpayOrder, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);

    if (
      !razorpayOrder.receipt?.startsWith(
        `u${req.user.userId}`
      ) ||
      payment.order_id !== razorpay_order_id
    ) {
      return res.status(403).json({
        message: "Payment order validation failed",
      });
    }

    if (
      payment.status !== "captured" ||
      payment.amount !== razorpayOrder.amount ||
      razorpayOrder.currency !== "INR" ||
      Math.round(attempt.total * 100) !==
        razorpayOrder.amount
    ) {
      return res.status(400).json({
        message: "Payment is not successfully captured",
      });
    }

    // If this checkout was already processed, return
    // its existing order rather than creating another.
    if (attempt.status === "processed") {
      const existingOrder = await Order.findOne({
        razorpayOrderId: razorpay_order_id,
        customer: req.user.userId,
        paymentStatus: "paid",
      });

      if (existingOrder) {
        return res.json({
          message: "Payment already verified",
          order: existingOrder,
        });
      }

      return res.status(409).json({
        message: "Payment is being processed. Please retry.",
      });
    }

    // Use the server-saved checkout details, not the
    // items or address supplied during verification.
    const orderItems = [];

    for (const item of attempt.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          message: "A product in your checkout no longer exists",
        });
      }

      // Reject changed prices rather than charging one
      // amount and recording another.
      if (product.price !== item.price) {
        return res.status(409).json({
          message: "A product price has changed. Please contact support.",
        });
      }

      orderItems.push({
        product: product._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    }

    // Create the actual Order only after verified payment.
    // Order uniqueness should also be enforced at DB level.
    const order = await Order.create({
      customer: attempt.customer,
      items: orderItems,
      shippingAddress: attempt.shippingAddress,
      total: attempt.total,
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    attempt.status = "processed";
    attempt.razorpayPaymentId = razorpay_payment_id;
    await attempt.save();

    return res.status(201).json({
      message: "Payment verified and order created successfully",
      order,
    });
  } catch (error) {
    // If two requests race, return the order that was
    // successfully created by the other request.
    if (error.code === 11000) {
      const existingOrder = await Order.findOne({
        razorpayOrderId: req.body.razorpay_order_id,
        customer: req.user.userId,
        paymentStatus: "paid",
      });

      if (existingOrder) {
        return res.json({
          message: "Payment already verified",
          order: existingOrder,
        });
      }
    }

    console.error(
      "Verify payment error:",
      error.message
    );

    return res.status(500).json({
      message: "Unable to verify payment",
    });
  }
};



// Get my orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.userId,
      paymentStatus: "paid",
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
      { new: true, runValidators: true },
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
    const { name, phone, address, city, state, pincode } = req.body;

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
      },
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
  verifyPayment,
  getMyOrders,
  getMyOrderById,
  getAllOrders,
  updateOrderStatus,
  updateMyOrderShipping,
  cancelMyOrder,
};
