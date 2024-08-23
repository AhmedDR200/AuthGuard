const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Utils
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

// routes
const authRoutes = require("./routes/authRoute");
const movieRoutes = require("./routes/movieRoute");
const userRoutes = require("./routes/userRoute");

// Load config
dotenv.config();

// Connect to DB
require("./config/db")();

const app = express();

// body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);

// 404 Error Handling Middleware
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `server (${process.env.NODE_ENV}) listening at http://localhost:${port}`
      .yellow.bold
  );
});

// Events => Event Loop => Callback Queue => Event Loop => Event Handler
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});
