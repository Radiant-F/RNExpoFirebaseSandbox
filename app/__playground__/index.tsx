import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios, { isAxiosError } from "axios";
import { Buffer } from "buffer";

function FancyButton({
  title,
  onPress,
  disabled,
}: {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  const animation = useRef(new Animated.Value(0)).current;
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    setTimeout(() => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Pressable
        disabled={disabled}
        style={styles.btn}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        <Text style={{ color: "white" }}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function AnimatedButton() {
  // const [selectedImage, setSelectedImage] =
  //   useState<ImagePicker.ImagePickerAsset | null>(null);

  async function onSelectImage() {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
      });
      if (!canceled && assets) {
        setSelectedImage(assets[0]);
      }
    } catch (error) {
      console.log("error picking image:", error);
    }
  }

  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  async function onCompressImage() {
    try {
      if (selectedImage) {
        // if you're using bearer token, skip this.
        // im using basic authentication so i need to do this.
        const base64Cred = Buffer.from(
          `api:JvGnySn1RfyYNBszbbSG5nf6csFcyfr7`
        ).toString("base64");

        // fetch the image uri's blob using fetch method.
        const imageResponse = await fetch(selectedImage.uri);
        const imageBlob = await imageResponse.blob();

        // read blob as array buffer using FileReader.
        const reader = new FileReader();
        reader.readAsArrayBuffer(imageBlob);

        reader.onloadend = async () => {
          try {
            // the binary data from FileReader.
            const binaryData = reader.result;

            const response = await axios.post(
              "https://api.tinify.com/shrink",
              binaryData,
              {
                headers: {
                  // "multipart/form-data" will not work. use "application/octet-stream" instead.
                  "Content-Type": "application/octet-stream",
                  Authorization: `Basic ${base64Cred}`,
                },
              }
            );

            console.log("success:", response.data);
          } catch (error) {
            if (isAxiosError(error)) {
              console.log("error compressing image:", error.response?.data);
            } else console.log("error:", error);
          }
        };

        // fallback incase something happened with the FileReader.
        reader.onerror = (err) => {
          console.log("Error reading file:", err);
        };
      } else console.log("no selected image detected");
    } catch (error) {
      console.log("error any:", error);
    }
  }

  return (
    <View>
      <FancyButton title="choose image" onPress={onSelectImage} />
      {selectedImage?.fileSize && (
        <View>
          <Image
            source={{ uri: selectedImage.uri }}
            style={{ width: "100%", height: 400 }}
            resizeMode="contain"
            resizeMethod="resize"
          />
          <Text style={{ color: "white" }}>{selectedImage.fileName}</Text>
          <Text style={{ color: "white" }}>
            {(selectedImage.fileSize / 1000000).toFixed(2)}MB
          </Text>
          <FancyButton title="reset" onPress={() => setSelectedImage(null)} />
        </View>
      )}

      <FancyButton
        title="compress the image"
        onPress={onCompressImage}
        disabled={!selectedImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#132a5c",
    borderRadius: 10,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
  },
});
