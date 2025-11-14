const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middleware/auth");
const { adminDashboard, adminUsers } = require("../controllers/adminController");

router.get("/", ensureAdmin, adminDashboard);
router.get("/users", ensureAdmin, adminUsers);



module.exports = router;
