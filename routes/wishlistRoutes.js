const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const wishlistController = require("../controllers/wishlistController");

// User wishlist page
router.get("/", ensureAuth, wishlistController.getWishlist);

// Add to wishlist
router.get("/add/:productId", ensureAuth, wishlistController.addToWishlist);

// Remove from wishlist
router.post("/remove/:productId", ensureAuth, wishlistController.removeFromWishlist);

module.exports = router;
