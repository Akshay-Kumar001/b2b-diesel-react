const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  getMyShippingAddress,
updateMyShippingAddress,
} = require("../controllers/userController");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getMyProfile);
router.patch("/me", protect, updateMyProfile);
router.get("/me/shipping", protect, getMyShippingAddress);
router.patch("/me/shipping", protect, updateMyShippingAddress);
router.get("/", protect, admin, getAllUsers);
router.patch("/:id", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);
router.get("/admin-test", protect, admin, (req, res) => {
  res.json({
    message: "Admin route accessed successfully",
    user: req.user,
  }); 

});

module.exports = router; 