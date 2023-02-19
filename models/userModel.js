const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "please Provide your name!"],
  },
  email: {
    type: String,
    require: [true, "please Provide Your Email"],
    unique: true,
    lowercase: true,
  },
  userPhoto: String,
  password: {
    type: String,
    require: [true, "Please Provide a Password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    require: [true, "Please confirm your password"],
    validate: {
      // This is only work on save or create compare the password
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

const User = mongoose.model("Users", userSchema);

// hash The password before save
userSchema.pre("save", async function (next) {
  // if we not modefied pawword but update other fields it move on next
  if (!this.isModified("password")) return next();

  //   wehen password modified then this code will run
  //   hash the password
  this.password = await bcrypt.hash(this.password, 12);
  //   Delete the confire password field
  this.passwordConfirm = undefined;
  next();
});

module.exports = User;
