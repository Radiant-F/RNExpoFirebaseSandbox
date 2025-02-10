import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type ChatListType = {
  id: string;
  members: string[];
  lastMessage: string;
  lastMessageTimestamp: FirebaseFirestoreTypes.Timestamp;
  lastMessageSender: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  otherUser: {
    displayName: string;
    photoURL: string;
    fcmToken: string;
  };
};

export type ContactListType = {
  createdAt: string;
  displayName: string;
  contactId: string;
  photo: string;
  status: string;
};

export type ChatMessageType = {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  id: string;
  senderId: string;
  text: string;
};

export type SendMessageType = {
  senderUid: string;
  senderName: string;
  senderPfp: string;
  text: string;
};
