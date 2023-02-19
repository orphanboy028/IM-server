const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get All user This Route handel By super Admin or Admin
router.route("/").get(userController.getAllUser);

module.exports = router;
