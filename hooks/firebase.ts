import storage from "@react-native-firebase/storage";
import { useState } from "react";

export function useCloudStorageFileUpload() {
  const [progress, setProgress] = useState<string>("0/0MiB");
  const [uploading, setUploading] = useState<boolean>(false);

  async function uploadFile(
    fileType: string,
    fileData: Blob | string,
    pathRef?: string
  ): Promise<string> {
    setUploading(true);
    try {
      const storageRef = storage().ref(pathRef);

      const task =
        typeof fileData === "string"
          ? storageRef.putFile(fileData, { contentType: fileType })
          : storageRef.put(fileData, { contentType: fileType });

      task.on("state_changed", (taskSnapshot) => {
        const MBTransferred = (taskSnapshot.bytesTransferred / 1000000).toFixed(
          1
        );
        const totalMB = (taskSnapshot.totalBytes / 1000000).toFixed(1);
        setProgress(`${MBTransferred}/${totalMB}MiB`);
      });

      await task;

      const fileDownloadUrl = await storageRef.getDownloadURL();
      return fileDownloadUrl;
    } catch (error) {
      console.log("Error uploading file:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  }

  return { progress, uploadFile, uploading };
}

export function useCloudStorageFileUploadOld() {
  const [progress, setProgress] = useState<string>("0/0MiB");
  const [uploading, setUploading] = useState<boolean>(false);

  async function uploadFile(
    fileType: string,
    fileUri: string,
    pathRef?: string
  ): Promise<string> {
    setUploading(true);
    try {
      const storageRef = storage().ref(pathRef);

      const task = storageRef.putFile(fileUri);
      task.on("state_changed", (taskSnapshot) => {
        const MBTransferred = (taskSnapshot.bytesTransferred / 1000000).toFixed(
          1
        );
        const totalMB = (taskSnapshot.totalBytes / 1000000).toFixed(1);
        setProgress(`${MBTransferred}/${totalMB}MiB`);
      });
      await storageRef.putFile(fileUri, { contentType: fileType });

      const fileDownloadUrl = await storageRef.getDownloadURL();
      setUploading(false);
      return fileDownloadUrl;
    } catch (error) {
      setUploading(false);
      console.log("error uploading file");
      return Promise.reject(error);
    }
  }

  return { progress, uploadFile, uploading };
}

export async function cloudStorageFileDelete(refUrl: string) {
  try {
    await storage().refFromURL(refUrl).delete();
  } catch (error) {
    console.log("error deleting file:", error);
  }
}
