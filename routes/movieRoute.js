const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const { protect } = require("../controllers/authController");

router.route("/").get(protect, getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
