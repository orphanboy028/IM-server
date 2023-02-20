const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

// GEt ALL User Handel By Super Admin- or other permisions users
exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});
