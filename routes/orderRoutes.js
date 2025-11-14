const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { ensureAuth } = require("../middleware/auth");

// Shipping form
router.get("/shipping", ensureAuth, (req, res) => {
  res.render("user/shipping", { title: "Shipping Details", user: req.session.user });
});
// Place order with shipping
router.post("/place-order", ensureAuth, orderController.placeOrder);


// Place an order (checkout)
router.post("/checkout", ensureAuth, orderController.checkout);

// Show user orders
router.get("/", ensureAuth, orderController.getOrders);

// User Order History
router.get("/my-orders", ensureAuth, orderController.getUserOrders);
// Order details page
router.get("/:id", ensureAuth, orderController.getOrderDetails);


module.exports = router;
