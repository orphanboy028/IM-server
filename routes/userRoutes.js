const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuthController = require("../controllers/auth/userAuthController");

// User Registration
router.post("/signup", userAuthController.signup);

// Get All user This Route handel By super Admin or Admin
router.route("/").get(userController.getAllUser);

module.exports = router;
