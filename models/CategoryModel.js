const mongoose = require("mongoose");

const leafCategorySchema = mongoose.Schema({
  leafCategoryName: {
    type: String,
    require: [true, "please Provide your name!"],
  },

  categoryImage: {
    type: String,
  },
});

const subCategorySchema = mongoose.Schema({
  subCategoryName: {
    type: String,
    require: [true, "please Provide your name!"],
  },

  descreption: {
    type: String,
  },

  categoryImage: {
    type: String,
  },

  lefCategory: [leafCategorySchema],
});

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    require: [true, "please Provide your name!"],
  },

  categoryImage: {
    type: String,
  },

  subCategory: [subCategorySchema],
});

// User Model
const Category = mongoose.model("Categories", categorySchema);

module.exports = Category;
