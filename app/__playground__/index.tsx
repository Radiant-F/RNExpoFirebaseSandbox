import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Playground() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={[...Array(20).keys()]}
        renderItem={({ index }) => {
          return (
            <View style={{ margin: 20 }}>
              <Text style={{ color: "white" }}>nomor: {index + 1}</Text>
              <TextInput
                placeholder="input text..."
                placeholderTextColor={"grey"}
              />
            </View>
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}
