const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/auth/adminAuthController");
const categoryController = require("../controllers/adminController/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(adminAuthController.adminProtect, categoryController.createCategory);

router
  .route("/:categoryId")
  .patch(adminAuthController.adminProtect, categoryController.addSubCategories)
  .delete(
    adminAuthController.adminProtect,
    categoryController.deleteMainCategory
  );

router
  .route("/subCategory")
  .post(adminAuthController.adminProtect, categoryController.createSubCategory)
  .get(adminAuthController.adminProtect, categoryController.getSubCategories);

router
  .route("/leaf-category")
  .post(adminAuthController.adminProtect, categoryController.createLeafCategory)
  .get(
    adminAuthController.adminProtect,
    categoryController.getAllLeafCatgories
  );

router
  .route("/leaf-category/:subcategoryId")
  .patch(adminAuthController.adminProtect, categoryController.addLefCategories);

module.exports = router;
