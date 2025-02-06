import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "@/hooks";
import firestore from "@react-native-firebase/firestore";
import { UserDataType } from "@/constant";
import { setCurrentUser } from "@/features/auth/services/authSlice";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const dispatch = useAppDispatch();

  const [fontLoaded] = useFonts({
    LexendRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
    LexendLight: require("@/assets/fonts/Lexend-Light.ttf"),
    LexendBold: require("@/assets/fonts/Lexend-Bold.ttf"),
  });

  // load fonts & get user data if available
  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
      const unsubscribe = auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userSnapshot = await firestore()
              .collection("users")
              .doc(user.uid)
              .get();
            dispatch(setCurrentUser(userSnapshot.data() as UserDataType));

            router.replace(user ? "/home" : "/authentication");
          } catch (error) {
            console.log("error getting user snapshot:", error);
            router.replace("/authentication");
          }
        } else setTimeout(() => router.replace("/authentication"), 1500);
      });
      return unsubscribe;
    }
  }, [fontLoaded]);

  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  );
}
