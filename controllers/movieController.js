const Movie = require("../models/movieModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/apiError");

/**
 * @desc    Get all movies
 * @route   GET /api/v1/movies
 * @access  Public
 */
exports.getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    status: "success",
    data: {
      movies,
    },
  });
});

/**
 * @desc    Get a single movie
 * @route   GET /api/v1/movies/:id
 * @access  Public
 */
exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

/**
 * @desc    Create a new movie
 * @route   POST /api/v1/movies
 * @access  Private
 */
exports.createMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      movie,
    },
  });
});

/**
 * @desc    Update a movie
 * @route   PATCH /api/v1/movies/:id
 * @access  Private
 */
exports.updateMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

/**
 * @desc    Delete a movie
 * @route   DELETE /api/v1/movies/:id
 * @access  Private
 */
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError("Movie not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
