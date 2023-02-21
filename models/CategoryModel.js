const mongoose = require("mongoose");
var slugify = require("slugify");

const leafCategorySchema = mongoose.Schema({
  leafCategoryName: {
    type: String,
    require: [true, "please Provide your name!"],
  },

  categoryImage: {
    type: String,
  },
});

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    require: [true, "please Provide your name!"],
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  categoryImage: {
    type: String,
  },

  subCategory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategories",
    },
  ],
});

// slug the main category
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.categoryName, {
    lower: false,
  });
  next();
});

// Category Model
const Category = mongoose.model("Categories", categorySchema);

module.exports = Category;
