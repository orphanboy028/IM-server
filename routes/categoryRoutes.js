const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/auth/adminAuthController");
const categoryController = require("../controllers/adminController/categoryController");

router
  .route("/")
  .get(adminAuthController.adminProtect, categoryController.getAllCategories)
  .post(adminAuthController.adminProtect, categoryController.createCategory);

module.exports = router;
