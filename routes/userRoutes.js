const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuth } = require("../middleware/auth");

// User dashboard
router.get("/", (req, res) => {
  res.render("user/dashboard", { title: "User Dashboard" ,user: req.session.user || null });
});

// Products page
router.get("/products", userController.allProducts);

// About Us page
router.get("/about", (req, res) => {
  res.render("user/about", { title: "About Us" });
});

// Contact Us page
router.get("/contact", (req, res) => {
  res.render("user/contact", { title: "Contact Us" });
});


module.exports = router;
