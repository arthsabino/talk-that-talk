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
};

export type ChildrenElement = ReactNode;
