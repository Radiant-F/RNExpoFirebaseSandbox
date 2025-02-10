import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";
import Gap from "./Gap";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { LexendRegular } from "@/constant";

type ModalBottomActionType = {
  visible?: boolean;
  onRequestClose?: () => void;
  buttons?: {
    title: string;
    icon: keyof typeof Icon.glyphMap;
    onPress?: () => void;
    danger?: boolean;
  }[];
  title?: string;
};

export default function ModalBottomAction({
  visible,
  onRequestClose,
  buttons = [
    {
      title: "Button one",
      icon: "ab-testing",
      onPress: () => null,
      danger: false,
    },
  ],
  title,
}: ModalBottomActionType) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onRequestClose} />
      <Gap flex={1} />
      <Animated.View style={styles.viewOption}>
        {title && <Text style={styles.textTitle}>{title}</Text>}

        {buttons.map((v, i) => {
          return (
            <View key={i}>
              <TouchableNativeFeedback
                useForeground
                background={TouchableNativeFeedback.Ripple("#ffffff40", false)}
                onPress={v.onPress}
              >
                <View style={styles.btnOption}>
                  <Icon
                    name={v.icon}
                    size={20}
                    color={v.danger ? "tomato" : "white"}
                  />
                  <Gap width={10} />
                  <Text
                    style={{
                      color: v.danger ? "tomato" : "white",
                      fontFamily: LexendRegular,
                    }}
                  >
                    {v.title}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              {buttons.length > 1 && <View style={styles.viewLine} />}
            </View>
          );
        })}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 15,
    marginHorizontal: 25,
    fontFamily: LexendRegular,
  },
  viewLine: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
    alignSelf: "center",
    width: "50%",
  },
  btnOption: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
  },
  viewOption: {
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 3,
    marginBottom: 30,
    borderRadius: 30,
    overflow: "hidden",
    width: "90%",
    maxWidth: 520,
    alignSelf: "center",
  },
  modalBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.5,
  },
});
