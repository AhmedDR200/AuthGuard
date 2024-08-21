const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/apiError");
const util = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @desc    Signup a new user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
    token,
  });
});

/**
 * @desc    Login a user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist in the request body
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // If everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: { user },
    token,
  });
});

/**
 * @desc    Protect routes
 */
exports.protect = asyncHandler(async (req, res, next) => {
  // read token from header & check if it exists
  const testToken = req.headers.authorization;

  let token;

  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }
  // validate token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // if token is valid, check if user still exists
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // check if user changed password after the token was issued
  const isPasswordChanged = await currentUser.changedPasswordAfter(
    decodedToken.iat
  );
  if (isPasswordChanged) {
    return next(
      new AppError("User recently changed password! Please login again.", 401)
    );
  }
  // allow access to protected route
  req.user = currentUser;
  next();
});

/**
 * @desc    Restrict routes to specific roles
 */
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
