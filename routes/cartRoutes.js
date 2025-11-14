const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { ensureAuth } = require("../middleware/auth");

// Show cart
router.get("/", ensureAuth, cartController.getCart);

// Add product to cart
router.post("/add/:id", ensureAuth, cartController.addToCart);

// Remove product from cart
router.post("/remove/:id", ensureAuth, cartController.removeFromCart);

module.exports = router;
