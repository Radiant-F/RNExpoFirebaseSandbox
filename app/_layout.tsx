import { ImageBackground, StatusBar } from "@/components";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ImageBackground />
      <StatusBar />

      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          statusBarTranslucent: true,
          statusBarBackgroundColor: "transparent",
          animation: Platform.OS == "ios" ? "default" : "fade",
        }}
      />
    </Provider>
  );
}
