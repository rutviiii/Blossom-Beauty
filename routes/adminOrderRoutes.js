const express = require("express");
const router = express.Router();
const adminOrderController = require("../controllers/adminOrderController");
const { ensureAuth } = require("../middleware/auth");

// middleware: only admins allowed
function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.redirect("/login");
}

// Show all orders
router.get("/", ensureAuth, ensureAdmin, adminOrderController.getAllOrders);

// Update order status
router.post("/update/:id", ensureAuth, ensureAdmin, adminOrderController.updateStatus);

module.exports = router;
