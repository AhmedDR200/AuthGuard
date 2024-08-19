const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Load config
dotenv.config();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000".blue);
});
