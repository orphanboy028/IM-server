const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

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

module.exports = app;
