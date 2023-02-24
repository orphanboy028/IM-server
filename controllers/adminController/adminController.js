const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Admin = require("../../models/adminModel");

exports.getAllAdmin = catchAsync(async (req, res, next) => {
  const adminList = await Admin.find();
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
    results: adminList.length,
    data: {
      adminList,
    },
  });
});
