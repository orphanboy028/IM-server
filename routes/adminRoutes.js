const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/auth/adminAuthController");
const userController = require("../controllers/userController");

// Admin Registration
router.post("/admin-signup", adminAuthController.adminSignup);
// Admin Login
router.post("/admin-login", adminAuthController.adminLogin);

// Get All user This Route handel By super Admin or Admin
router
  .route("/")
  .get(adminAuthController.adminProtect, userController.getAllUser);

module.exports = router;
