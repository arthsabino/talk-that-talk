const express = require("express");
const {
  fetchNotifications,
  createNotification,
  isReadNotification,
} = require("../controllers/notificationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchNotifications);
router.route("/").post(protect, createNotification);
router.route("/read").post(protect, isReadNotification);

module.exports = router;
