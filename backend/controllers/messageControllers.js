// @ts-nocheck
const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).send({ message: "Invalid data passed into request" });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let currentMessage = await Message.create(newMessage);
    currentMessage = await currentMessage.populate("sender", "name picture");
    currentMessage = await currentMessage.populate("chat");
    currentMessage = await User.populate(currentMessage, {
      path: "chat.users",
      select: "name picture email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: currentMessage,
    });

    res.status(201).json(currentMessage);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messageList = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name picture email")
      .populate("chat");
    //update notification here
    res.send(messageList);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

module.exports = {
  sendMessage,
  allMessages,
};
