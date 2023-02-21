const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Category = require("../../models/CategoryModel");
const SubCategory = require("../../models/subCategoreyModel");
const LefCategory = require("../../models/leafCategoryModel");
///////////////////////////////
// Get All category
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Category.find();
  //Category Response
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    results: allCategories.length,
    allCategories,
  });
});

// Create only Main category by Admin
exports.createCategory = catchAsync(async (req, res, next) => {
  // const { categoryName } = req.body;

  const newCategory = await Category.create(req.body);

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    data: {
      newCategory,
    },
  });
});

// Delete Main Category
exports.deleteMainCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndDelete(categoryId);

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
  });
});

/////////////////////////////////////////////////////////
// add sub-Categories in main Category
exports.addSubCategories = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const { subCategoryId } = req.body;
  const addSubCategoies = await Category.findByIdAndUpdate(
    { _id: categoryId },
    {
      $addToSet: { subCategory: subCategoryId },
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "Success",
    requesteAt: req.requestTime,
    addSubCategoies,
  });
});

// Create Sub-Categories
exports.createSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.create(req.body);
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    subCategory,
  });
});

exports.getSubCategories = catchAsync(async (req, res, next) => {
  const getAllSubCategories = await SubCategory.find();

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    results: getAllSubCategories.length,
    data: {
      getAllSubCategories,
    },
  });
});

// create Leaf Category
exports.createLeafCategory = catchAsync(async (req, res, next) => {
  const createLefCategory = await LefCategory.create(req.body);
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    createLefCategory,
  });
});

// Get Lef Catogries
exports.getAllLeafCatgories = catchAsync(async (req, res, next) => {
  const getAll = await LefCategory.find();

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    getAll,
  });
});

exports.addLefCategories = catchAsync(async (req, res, next) => {
  const { subcategoryId } = req.params;
  const { lefCategoryId } = req.body;
  const addLefategoies = await SubCategory.findByIdAndUpdate(
    { _id: subcategoryId },
    {
      $addToSet: { lefCategory: lefCategoryId },
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "Success",
    requesteAt: req.requestTime,
    addLefategoies,
  });
});
