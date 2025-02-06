import { UserDataType } from "./user";

export type PostDataType = {
  title: string;
  description: string;
  mediaUrl: {
    url: string;
    fileType: string;
  }[];
  createdAt: string;
  updatedAt: string;
  likes: { [userId: string]: boolean };
  likeCount: number;
  creator: UserDataType;
  id: string;
};

export type MediaFileType = {
  fileUri: string;
  fileName: string;
  fileType: string;
};
