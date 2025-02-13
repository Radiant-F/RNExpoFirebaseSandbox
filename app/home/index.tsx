import { Button, StyleSheet, Text, View } from "react-native";
import { Header, ModalLoadingOverlay, FeatureListing } from "@/components";
import { useSignOut } from "@/features/auth";
import { router } from "expo-router";
import { LexendRegular } from "@/constant";

export default function Home() {
  const { signOut } = useSignOut();

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Firebase Sandbox"
        buttonLeft={{
          icon: "logout",
          iconFlip: true,
          onPress: () => signOut(),
        }}
        buttonRight={{
          onPress: () => router.navigate("/user"),
          showImageProfile: true,
        }}
      />

      <Text style={styles.textGreet}>Checkout the available features!</Text>

      <View style={styles.container}>
        <FeatureListing />
      </View>

      <Button
        title="playground"
        onPress={() => router.navigate("/__playground__")}
      />

      {/* <ModalLoadingOverlay visible={loading} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    maxWidth: 520,
    alignSelf: "center",
  },
  textGreet: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: LexendRegular,
  },
});
