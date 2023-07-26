// @ts-nocheck
const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Notification = require("../models/NotificationModel");
const Chat = require("../models/ChatModel");

const fetchNotifications = asyncHandler(async (req, res) => {
  try {
    const notificationList = await Notification.find({
      receivers: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("message", "content")
      .sort({ updatedAt: -1 });
    res.status(200).send(notificationList);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const createNotification = asyncHandler(async (req, res) => {
  const { chatId, messageId, userId, content } = req.body;

  if (!messageId || !userId || !chatId || !content) {
    res.status(400).send({ message: "Invalid data passed into request" });
  }
  const newNotificationData = {
    content: content,
    message: messageId,
  };
  try {
    const chat = await Chat.findOne({ _id: chatId }).populate(
      "users",
      "-password"
    );
    const receivers =
      chat.users && chat.users.length > 0
        ? chat.users.filter((u) => u._id != userId)
        : [];
    const createdNotification = await Notification.create({
      ...newNotificationData,
      receivers: receivers,
    });
    const fullNotification = await Notification.findOne({
      _id: createdNotification._id,
    }).populate("message", "content sender");

    res.status(200).send(fullNotification);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = {
  fetchNotifications,
  createNotification,
};
