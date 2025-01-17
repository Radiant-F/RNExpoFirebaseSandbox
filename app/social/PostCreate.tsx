import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ButtonStyled, Gap, Header, FormInput } from "../../components";
import { useCreatePost, useCreatePostNew } from "@/features/social";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { MediaFileType, PostDataType } from "@/constant";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";

export default function PostCreate() {
  const user = useAppSelector((state) => state.auth.user);
  const { control, handleSubmit } = useForm<PostDataType>({
    defaultValues: {
      title: "",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mediaUrl: [],
      creator: user,
      likeCount: 0,
      likes: {},
    },
  });
  const { createPost, loading, mediaProgress } = useCreatePostNew();
  const onCreatePost = (data: PostDataType) => createPost(data, mediaData);

  const [mediaData, setMediaData] = useState<MediaFileType[]>([]);

  async function onSelectMedia(type: "camera" | "library") {
    try {
      const pickerOptions: ImagePicker.ImagePickerOptions = {
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 3 - mediaData.length,
      };

      const data =
        type == "library"
          ? await ImagePicker.launchImageLibraryAsync(pickerOptions)
          : await ImagePicker.launchCameraAsync(pickerOptions);

      if (data.assets) {
        const mediaFiles: MediaFileType[] = [...mediaData];
        data.assets.map((v) => {
          mediaFiles.push({
            fileName: v.fileName as string,
            fileType: v.type as string,
            fileUri: v.uri as string,
          });
        });
        setMediaData(mediaFiles);
      }
    } catch (error) {
      console.log("error selecting media:", error);
    }
  }

  function VideoViewer({ source }: { source: VideoSource }) {
    const player = useVideoPlayer(source, (player) => {
      player.pause();
    });

    return (
      <VideoView
        player={player}
        allowsFullscreen
        contentFit="cover"
        style={{ width: "100%", height: 200 }}
      />
    );
  }

  return (
    <View>
      <Header
        title="Create Post"
        buttonLeft={{
          icon: "chevron-left",
          onPress: () => router.back(),
        }}
      />
      <View style={{ margin: 20 }}>
        <FormInput
          control={control}
          fieldName="title"
          fieldIcon="text"
          fieldTitle="Title"
          placeholder="Post title..."
          rules={{ required: true, minLength: 3 }}
        />
        <FormInput
          control={control}
          fieldName="description"
          fieldIcon="text-long"
          fieldTitle="Description"
          placeholder="Post description..."
          rules={{ minLength: 1 }}
          multiline
          numberOfLines={2}
        />

        <ScrollView horizontal>
          {mediaData.length >= 1 &&
            mediaData.map((v, index) => (
              <View key={index} style={styles.viewMedia}>
                {/* display image */}
                {v.fileType.includes("image") && (
                  <Image
                    source={{ uri: v.fileUri }}
                    style={{ width: "100%", height: 200 }}
                    resizeMethod="resize"
                  />
                )}
                {/* display video */}
                {v.fileType.includes("video") && (
                  <VideoViewer source={v.fileUri} />
                )}
                <TouchableOpacity
                  style={{
                    ...styles.btnClearMedia,
                    top: v.fileType.includes("video") ? 10 : undefined,
                    bottom: v.fileType.includes("image") ? 10 : undefined,
                  }}
                  onPress={() =>
                    setMediaData(mediaData.filter((v, i) => i != index))
                  }
                >
                  <Icon
                    name="trash-can"
                    color={"white"}
                    size={20}
                    style={{ textAlign: "center" }}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        <View style={{ flexDirection: "row" }}>
          <ButtonStyled
            icon="folder-multiple-image"
            title="Gallery"
            style={{ flex: 1 }}
            fontSizeTitle={15}
            onPress={() => onSelectMedia("library")}
            iconSize={20}
            disabled={mediaData.length >= 3}
          />
          <Gap width={10} />
          <ButtonStyled
            icon="camera"
            title="Camera"
            style={{ flex: 1 }}
            fontSizeTitle={15}
            onPress={() => onSelectMedia("camera")}
            iconSize={20}
            disabled={mediaData.length >= 3}
          />
        </View>
        <Gap height={20} />
        <ButtonStyled
          title="Create Post"
          onPress={handleSubmit(onCreatePost)}
          loading={loading}
        />

        {loading && <Text style={{ color: "white" }}>{mediaProgress}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnClearMedia: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#00000080",
    borderRadius: 35 / 2,
    position: "absolute",
    justifyContent: "center",
    right: 10,
  },
  viewMedia: {
    width: 300,
    marginHorizontal: 10,
    marginBottom: 10,
    overflow: "hidden",
    borderRadius: 20,
    elevation: 5,
    borderWidth: 3,
    borderColor: "white",
  },
});
