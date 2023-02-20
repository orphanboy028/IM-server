const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");

// User Register API
exports.signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm } = req.body;
  //1) check the required Fields
  if (!fullName || !email || !password || !passwordConfirm) {
    return next(new AppError("Please Provide the Required fields", 404));
  }
  //2) check user is in data base
  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError("Your Are Already Registered Please Login", 400));
  }
  //   3) Create new user
  const newUser = await User.create({
    fullName,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "sucess",
    data: {
      newUser: newUser,
    },
  });
});
