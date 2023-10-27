const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { upload } = require("../services/uploadImage");

const router = express.Router();

router
  .route("/")
  .post(upload.single("file"), registerUser)
  .get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
