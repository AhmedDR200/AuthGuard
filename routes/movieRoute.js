const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const { protect, restrictTo } = require("../controllers/authController");

router.route("/").get(protect, restrictTo("admin"), getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
