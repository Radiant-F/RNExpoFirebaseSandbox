import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function ModalLoadingOverlay({
  visible,
  onRequestClose,
}: {
  visible: boolean;
  onRequestClose?: () => void;
}) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onRequestClose} />
        <View style={styles.viewLoading}>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewLoading: {
    width: 175,
    height: 175,
    backgroundColor: "white",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
