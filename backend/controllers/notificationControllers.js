// @ts-nocheck
const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Notification = require("../models/NotificationModel");
const Chat = require("../models/ChatModel");

const fetchNotifications = asyncHandler(async (req, res) => {
  try {
    let notificationList = await Notification.find(
      {
        "receivers.user": req.user._id,
      },
      { receivers: 0 }
    )
      .populate("message", "content sender")
      .sort({ updatedAt: -1 });
    notificationList = await User.populate(notificationList, {
      path: "message.sender",
      select: "name",
    });
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
    let receivers =
      chat.users && chat.users.length > 0
        ? chat.users.filter((u) => u._id != userId)
        : [];
    receivers = receivers.map((r) => ({ user: r, isRead: false }));
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

const isReadNotification = asyncHandler(async (req, res) => {
  const { notificationId, userId } = req.body;

  if (!notificationId || !userId) {
    res.status(400).send({ message: "Invalid data passed into request" });
  }

  const updatedNotif = await Notification.findByIdAndUpdate(notificationId, {
    isRead: true,
  });

  if (updatedNotif) {
    res.status(201).send(updatedNotif);
  } else {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

module.exports = {
  fetchNotifications,
  createNotification,
  isReadNotification,
};