const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

// middleware
// body-parser in build express midelwear
app.use(morgan("dev"));
app.use(express.json());

// custome middleware for test
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// API ROUTES
app.use("/api/v1/indiamart/user", userRoutes);

app.listen(5000, () => console.log("server is Running on port 5000"));
