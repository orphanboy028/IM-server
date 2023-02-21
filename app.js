const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorController");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body-parser in build express midelwear
app.use(express.json());

// custome middleware for test
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// API ROUTES
app.use("/api/v1/indiamart/user", userRoutes);
app.use("/api/v1/indiaMart/admin", adminRoutes);

// Route is not defined Error midelwear
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
