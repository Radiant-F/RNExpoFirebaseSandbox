import { Platform, View, StatusBar as DefaultStatusBar } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StatusBar() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ height: insets.top }} />
      {Platform.OS == "android" && (
        <DefaultStatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"light-content"}
        />
      )}
    </>
  );
}
