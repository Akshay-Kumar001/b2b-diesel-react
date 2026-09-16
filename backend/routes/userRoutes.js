const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const admin = require("../middleware/adminMiddleware");



router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/admin-test", protect, admin, (req, res) => {
  res.json({
    message: "Admin route accessed successfully",
    user: req.user,
  });

});

module.exports = router; 