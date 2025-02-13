import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Gap } from "@/components";
import { useAppSelector } from "@/hooks";
import { ChatListType, LexendBold, LexendRegular, storage } from "@/constant";
import { router } from "expo-router";

export default function RenderChatList({ item }: { item: ChatListType }) {
  const storedUser = useAppSelector((state) => state.auth.user);

  const lastMessageTimestamp = item.lastMessageTimestamp
    ?.toDate()
    .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  function onNavigateToChatScreen() {
    storage.set(
      "current-chat-screen",
      JSON.stringify({
        chat_id: item.id,
        currentUid: storedUser.uid,
        currentName: storedUser.displayName,
        currentPfp: storedUser.photoURL,
      })
    );
    router.navigate({
      pathname: "/chat/chat-screen",
      params: {
        chat_id: item.id,
        chat_name: item.otherUser.displayName,
      },
    });
  }

  const lastMessageSender =
    item?.lastMessageSender == storedUser.displayName
      ? "You: "
      : item?.lastMessageSender
      ? `${item?.lastMessageSender}: `
      : "";

  return (
    <TouchableNativeFeedback useForeground onPress={onNavigateToChatScreen}>
      <View style={styles.btnChatContainer}>
        <Image
          source={{ uri: item.otherUser.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
          resizeMethod="resize"
        />
        <Gap width={10} />
        <View style={{ flex: 1 }}>
          <Text style={styles.textContactName}>
            {item.otherUser.displayName}
          </Text>
          <Text style={styles.textLastMessage} numberOfLines={1}>
            {lastMessageSender}
            {item.lastMessage}
          </Text>
        </View>
        <Gap width={20} />
        <Text style={{ fontFamily: LexendRegular, color: "white" }}>
          {lastMessageTimestamp}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textLastMessage: {
    color: "white",
    fontFamily: LexendRegular,
  },
  textContactName: {
    textAlign: "left",
    color: "white",
    fontFamily: LexendBold,
  },
  btnChatContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
});
