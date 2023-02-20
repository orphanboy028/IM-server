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

// Password match schema method use for login
userSchema.methods.correctPassword = async function (
  userPassword,
  hashPassword
) {
  return await bcrypt.compare(userPassword, hashPassword);
};

// check password change or not after token isshued
userSchema.methods.changePasswordAfter = function (JWTTimeStemp) {
  if (this.passwordChangeAt) {
    const changeTimestemp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimeStemp < changeTimestemp;
  }
  return false;
};
const User = mongoose.model("Users", userSchema);

module.exports = User;
