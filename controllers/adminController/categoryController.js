const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Category = require("../../models/CategoryModel");

// Get All category
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Category.find();
  //Category Response
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    results: allCategories.length,
  });
});

// Create only Main category by Admin
exports.createCategory = catchAsync(async (req, res, next) => {
  const { categoryName } = req.body;

  const newCategory = await Category.create({ categoryName });

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    data: {
      newCategory,
    },
  });
});

// Create Sub-Categories
