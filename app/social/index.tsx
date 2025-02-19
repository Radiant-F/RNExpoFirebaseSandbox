import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import { ButtonStyled, Gap, Header, SuchEmpty } from "@/components";
import { router } from "expo-router";
import { PostHeader, PostMedia, useSocialPosts } from "@/features/social";
import { useRef } from "react";
import { useAppDispatch } from "@/hooks";
import { setPostIndexInView } from "@/features/social/services/socialSlice";

export default function Social() {
  const posts = useSocialPosts();
  const dispatch = useAppDispatch();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        dispatch(setPostIndexInView(viewableItems[0].index));
      }
    }
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {posts.length == 0 && <SuchEmpty />}

      <Header
        title="Social"
        buttonLeft={{
          icon: "chevron-left",
          onPress: () => router.back(),
        }}
        buttonRight={{
          onPress: () => router.navigate("/social/SocialPersonal"),
          showImageProfile: true,
        }}
      />

      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        ListFooterComponent={<Gap height={110} />}
        contentContainerStyle={styles.container}
        data={posts}
        renderItem={({ index, item: post }) => {
          return (
            <View style={styles.containerPost}>
              <PostHeader post={post} />
              {post.mediaUrl.length > 0 && (
                <PostMedia mediaSource={post.mediaUrl} postIndex={index} />
              )}
            </View>
          );
        }}
      />

      <ButtonStyled
        onPress={() => {
          router.navigate("/social/PostCreate");
          dispatch(setPostIndexInView(null));
        }}
        title="Create Post"
        icon="notebook-plus-outline"
        style={styles.btnFloating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnFloating: {
    position: "absolute",
    bottom: 40,
    right: 25,
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  containerPost: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ffffff40",
    marginBottom: 15,
  },
});
