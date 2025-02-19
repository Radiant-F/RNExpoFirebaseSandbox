import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";

export function useTinyPNG() {
  const [loading, setLoading] = useState(false);

  async function compressImage(media: {
    fileUri: string;
    fileName: string;
    fileType: string;
  }): Promise<FileSystem.FileSystemDownloadResult | undefined> {
    setLoading(true);
    try {
      const base64Cred = Buffer.from(
        `api:JvGnySn1RfyYNBszbbSG5nf6csFcyfr7`
      ).toString("base64");

      const imageResponse = await fetch(media.fileUri);
      const imageBlob = await imageResponse.blob();

      // Convert the Blob to ArrayBuffer using Promise
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(imageBlob);
      });

      // Send the ArrayBuffer to TinyPNG
      const response = await axios.post(
        "https://api.tinify.com/shrink",
        arrayBuffer,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            Authorization: `Basic ${base64Cred}`,
          },
        }
      );

      const compressedUrl = response.data.output.url;
      const localFileUri = `${FileSystem.cacheDirectory}${Date.now()}_${
        media.fileName
      }`;
      const downloadRes = await FileSystem.downloadAsync(
        compressedUrl,
        localFileUri
      );

      setLoading(false);
      return downloadRes;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("Error compressing image:", error.response?.data);
      } else console.log("Unexpected error:", error);
      setLoading(false);
      return undefined;
    }
  }

  return { loading, compressImage };
}
