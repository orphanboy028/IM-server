const mongoose = require("mongoose");
var slugify = require("slugify");

const LefCategorySchema = mongoose.Schema({
  lefCategoryName: {
    type: String,
    require: [true, "please Provide your name!"],
    unique: true,
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  descreption: {
    type: String,
  },

  categoryImage: {
    type: String,
  },
});

// slug the sub-Category category
LefCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.lefCategoryName, {
    lower: false,
  });
  next();
});

//SubCategory Model
const LefCategory = mongoose.model("LefCategories", LefCategorySchema);

module.exports = LefCategory;
