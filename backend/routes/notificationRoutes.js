const express = require("express");
const {
  fetchNotifications,
  createNotification,
} = require("../controllers/notificationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchNotifications);
router.route("/").post(protect, createNotification);

module.exports = router;
