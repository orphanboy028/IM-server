// Files
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Admin = require("../../models/adminModel");
// NPM packages
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// create tooken respose
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);
  //   Hide the password from respose data
  user.password = undefined;
  res.status(statusCode).json({
    status: "Success",
    token,
    message,
    user,
  });
};

// common signToken
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Admin Register API
exports.adminSignup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm } = req.body;
  console.log(fullName, email, password, passwordConfirm);
  //1) check the required Fields
  if (!fullName || !email || !password || !passwordConfirm) {
    return next(new AppError("Please Provide the Required fields", 404));
  }
  //2) check user is in data base
  const admin = await Admin.findOne({ email });

  if (admin) {
    return next(new AppError("Your Are Already Registered Please Login", 400));
  }
  //   3) Create new user
  const newadmin = await Admin.create({
    fullName,
    email,
    password,
    passwordConfirm,
  });

  const message = "your Registration sucessfulled";
  createSendToken(newadmin, 201, res, message);
});

// Login User API
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //   1) user input validation
  if (!email || !password) {
    return next(new AppError("Please Enter your Email and Password", 400));
  }
  // 2) check user in data base
  const admin = await Admin.findOne({ email }).select("+password");

  // 3) check password is correct or not
  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError("Your user email or password is incorrect", 401));
  }
  //4) Create Jwt token
  const message = "your login sucessfulled";
  createSendToken(admin, 201, res, message);
});

// user Protect Route Authntication

exports.adminProtect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("please login first", 401));
  }

  // 2) token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if user still exists
  const freshAdmin = await Admin.findById(decoded.id);

  if (!freshAdmin) {
    return next(new AppError("User Blonge to this credintial no longer exist"));
  }

  // 4) check if user chnage password after the token was issued

  if (freshAdmin.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("password has recantely changed please login again")
    );
  }

  // Grant Acces to protected Route
  req.admin = freshAdmin;
  next();
});
