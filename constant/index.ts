// fonts
import { LexendBold, LexendRegular, LexendThin } from "./fonts";
export { LexendBold, LexendRegular, LexendThin };

// local storage instance
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();

import { UserDataType, UserDefaultPfp, DefaultUserData } from "./user";
export { UserDataType, UserDefaultPfp, DefaultUserData };

import { TaskType, DefaultTaskData } from "./task";
export { TaskType, DefaultTaskData };

import { PostDataType, MediaFileType } from "./social";
export { PostDataType, MediaFileType };

import {
  ChatListType,
  ContactListType,
  ChatMessageType,
  SendMessageType,
} from "./chat";
export { ChatListType, ContactListType, ChatMessageType, SendMessageType };
