const express = require("express");
const router = express.Router();
const {
  showLogin, loginUser,
  showRegister, registerUser,
  logoutUser, userDashboard
} = require("../controllers/authController");
const { ensureAuth } = require("../middleware/auth");


// Auth
router.get("/login", showLogin);
router.post("/login", loginUser);
router.get("/register", showRegister);
router.post("/register", registerUser);
router.get("/logout", logoutUser);

// User dashboard
router.get("/user",  userDashboard);

module.exports = router;
