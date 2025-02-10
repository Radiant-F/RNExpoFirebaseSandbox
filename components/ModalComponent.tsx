import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { LexendRegular } from "@/constant";

type ModalComponentType = {
  onRequestClose?: () => void;
  visible?: boolean;
  title?: string;
  iconLeft?: keyof typeof Icon.glyphMap;
  iconRight?: keyof typeof Icon.glyphMap;
  childern?: React.JSX.Element;
};

export default function ModalComponent({
  onRequestClose,
  visible = true,
  title = "Modal Title",
  iconLeft = "ab-testing",
  childern,
}: ModalComponentType) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Pressable style={styles.modalBackdrop} onPress={onRequestClose} />
        <View style={styles.viewModalContainer}>
          <View style={styles.viewModalHeader}>
            <Icon name={iconLeft} color={"white"} size={25} />
            <Text style={{ color: "white", fontFamily: LexendRegular }}>
              {title}
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onRequestClose}>
              <Icon name="close-circle-outline" color={"white"} size={25} />
            </TouchableOpacity>
          </View>
          {childern}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewModalContainer: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 30,
    elevation: 5,
    borderColor: "white",
    borderWidth: 4,
    width: "85%",
    maxWidth: 480,
  },
  modalBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.5,
  },
});
