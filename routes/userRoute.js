const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../controllers/authController");
const userController = require("../controllers/userController");
const {
  updatePassword,
  updateProfile,
  inactiveAccount,
} = require("../controllers/userController");

// Routes that do not require restrictTo middleware
router.route("/updatepassword").patch(protect, updatePassword);

router.route("/updateprofile").patch(protect, updateProfile);

router.route("/inactiveaccount").delete(protect, inactiveAccount);

// Routes that require restrictTo middleware
router
  .route("/")
  .get(protect, restrictTo("admin"), userController.getUsers)
  .post(protect, restrictTo("admin"), userController.createUser);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), userController.getUser)
  .patch(protect, restrictTo("admin"), userController.updateUser)
  .delete(protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;
