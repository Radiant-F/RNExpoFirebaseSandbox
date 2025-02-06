const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.rnfirebasesandbox.dev";
  }

  if (IS_PREVIEW) {
    return "com.rnfirebasesandbox.preview";
  }

  return "com.rnfirebasesandbox";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Firebase Sandbox (Dev)";
  }

  if (IS_PREVIEW) {
    return "Firebase Sandbox (Preview)";
  }

  return "Firebase Sandbox";
};

export default {
  expo: {
    name: getAppName(),
    slug: "FirebaseExpoSandbox",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
      googleServicesFile: "./services/GoogleService-Info.plist",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
      googleServicesFile: "./services/google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "@react-native-google-signin/google-signin",
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Lexend-Light.ttf",
            "./assets/fonts/Lexend-Regular.ttf",
            "./assets/fonts/Lexend-Bold.ttf",
          ],
        },
      ],
      [
        "expo-video",
        {
          supportsBackgroundPlayback: true,
          supportsPictureInPicture: true,
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      "react-native-video",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "695ae1d8-dd00-46cc-9113-10942759eb4f",
      },
    },
    owner: "exkoi.dev",
  },
};
