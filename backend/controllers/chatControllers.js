// @ts-nocheck
const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res
      .status(401)
      .send({ message: "UserId param is not sent in the request" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //gets latest message with sender
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(201).send(fullChat);
    } catch (error) {
      res.sendStatus(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        userChats = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(userChats);
      });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.userIds || !req.body.chatName) {
    res.status(401).send({ message: "Incomplete data." });
  }
  const userIds = JSON.parse(req.body.userIds);
  const chatName = req.body.chatName;
  const currentUserId = req.user._id;
  if (userIds.length < 2) {
    res.status(401).send({ message: "Must have more than 2 users." });
  }
  try {
    const groupChatData = {
      chatName,
      isGroupChat: true,
      users: [currentUserId, ...userIds],
      groupAdmin: req.user,
    };
    const createdChat = await Chat.create(groupChatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(201).send(fullChat);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    res.status(401).send({ message: "Incomplete data." });
  }
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin");
  if (updatedChat) {
    res.status(201).send(updatedChat);
  } else {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const { chatId, userId } = req.body;
  if (!currentUserId || !chatId || !userId) {
    res.status(401).send({ message: "Incomplete data." });
  }
  const checkGroupAdmin = await Chat.findOne({
    _id: chatId,
    $and: [{ groupAdmin: { $eq: currentUserId } }, { isGroupChat: true }],
  });

  if (checkGroupAdmin) {
    //remove user here
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin");
    if (updatedChat) {
      res.status(201).send(updatedChat);
    } else {
      res.sendStatus(400);
      throw new Error(error.message);
    }
  } else {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(401).send({ message: "Incomplete data." });
  }
  try {
    const groupChat = await Chat.find({
      _id: chatId,
    });

    if (groupChat) {
      //add user here
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin");
      if (updatedChat) {
        res.status(201).send(updatedChat);
      }
    }
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
