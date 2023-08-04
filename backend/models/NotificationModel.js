const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receivers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        isRead: { type: Boolean, default: false },
      },
    ],
    content: { type: String, trim: true },
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
