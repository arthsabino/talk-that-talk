import { ReactNode } from "react";

export type User = {
  [key: string]: any;
  name: string;
  email: string;
  picture: string;
  token: string;
  _id: string;
};
export type Chat = {
  [key: string]: any;
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
  groupAdmin?: User;
  latestMessage?: Message;
};

export type Message = {
  [key: string]: any;
  content: string;
  sender: User;
  chat: Chat;
};

export type ChildrenElement = ReactNode;
