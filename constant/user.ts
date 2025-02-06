export const UserDefaultPfp =
  "https://firebasestorage.googleapis.com/v0/b/fauthdemo-4d043.appspot.com/o/124034934_p0.jpg?alt=media&token=dc9cc480-52e8-41b2-b07f-6fb69696becc";

export type UserDataType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
  fcmToken: string;
  contacts?: {
    [contactId: string]: {
      displayName: string;
      photo: string;
      status: "pending" | "requested" | "confirmed";
      lastMessage?: string;
      lastMessageTimestamp?: string;
    };
  };
};

export const DefaultUserData: UserDataType = {
  uid: "",
  displayName: "",
  email: "",
  anonymous: false,
  photoURL: UserDefaultPfp,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  contacts: {},
  fcmToken: "",
};
