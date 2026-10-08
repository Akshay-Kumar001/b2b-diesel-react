const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
  getAllOrders,
  updateOrderStatus,
  updateMyOrderShipping,
  cancelMyOrder,
} = require("../controllers/orderController");


const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getMyOrderById);
router.patch("/:id/shipping", protect, updateMyOrderShipping);
router.patch("/:id/cancel", protect, cancelMyOrder);
router.get("/", protect, admin, getAllOrders);
router.patch("/:id", protect, admin, updateOrderStatus);

module.exports = router;