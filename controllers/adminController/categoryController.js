const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Categories = require("../../models/CategoryModel");
const SubCategory = require("../../models/subCategoreyModel");
const LefCategory = require("../../models/leafCategoryModel");
///////////////////////////////
// Get All category
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Categories.find();
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
  console.log(req.body);
  const { categoryName } = req.body;
  console.log(categoryName);

  const newCategory = await Categories.create({
    categoryName: categoryName,
  });

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    newCategory,
  });
});

// Delete Main Category
exports.deleteMainCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await Categories.findByIdAndDelete(categoryId);

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
  });
});

/////////////////////////////////////////////////////////
// add sub-Categories in main Category
exports.addSubCategories = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const { subCategoryId } = req.body;

  const addSubCategoies = await Categories.findOneAndUpdate(
    { slug: categorySlug },
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
  const { categorySlug } = req.params;
  const { subCategoryName, descreption } = req.body;
  const subCategory = await SubCategory.create({
    subCategoryName,
    descreption,
    categorySlug,
  });
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    subCategory,
  });
});

exports.getSubCategories = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const getAllSubCategories = await SubCategory.find({
    categorySlug: categorySlug,
  });

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
  const { subcategoryslug } = req.params;
  const { lefCategoryName, descreption } = req.body;
  const createLefCategory = await LefCategory.create({
    lefCategoryName,
    descreption,
    subcategoryslug,
  });
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
  const { subcategoryslug } = req.params;
  const { lefCategoryId } = req.body;
  const addLefategoies = await SubCategory.findOneAndUpdate(
    { slug: subcategoryslug },
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
