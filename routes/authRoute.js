const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPasswordCode,
  resetPassword,
  refreshToken,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifypasswordcode", verifyPasswordCode);
router.put("/resetpassword", resetPassword);
router.post("/refresh", refreshToken);

module.exports = router;
