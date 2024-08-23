const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPasswordCode,
  resetPassword,
  updatePassword,
  updateProfile,
  inactiveAccount,
  protect,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifypasswordcode", verifyPasswordCode);
router.put("/resetpassword", resetPassword);
router.patch("/updatepassword", protect, updatePassword);
router.patch("/updateprofile", protect, updateProfile);
router.delete("/inactiveaccount", protect, inactiveAccount);

module.exports = router;
