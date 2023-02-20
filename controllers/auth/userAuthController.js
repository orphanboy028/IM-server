// Files
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");
// NPM packages
const jwt = require("jsonwebtoken");

// create tooken respose
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  //   Hide the password from respose data
  user.password = undefined;
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

// common signToken
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

  createSendToken(newUser, 201, res);
});

// Login User API
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //   1) user input validation
  if (!email || !password) {
    return next(new AppError("Please Enter your Email and Password", 400));
  }
  // 2) check user in data base
  const user = await User.findOne({ email }).select("+password");

  // 3) check password is correct or not
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Your user email or password is incorrect", 401));
  }
  //4) Create Jwt token
  createSendToken(user, 201, res);
});

// user Protect Route Authntication

exports.userProtect = catchAsync(async (req, res, next) => {
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
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const freshUser = User.findById({ id: decoded._id });

  if (!freshUser) {
    return next(new AppError("User Blonge to this credintial no longer exist"));
  }

  // 4) check if user chnage password after the token was issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("password was recentely change please login again", 401)
    );
  }

  // Grant Acces to protected Route
  req.user = freshUser;
  next();
});
