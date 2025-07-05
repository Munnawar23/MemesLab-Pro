import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "@navigation/AppNavigator";
import { themeColors } from "./styles/globalStyles/themeColors";

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("@assets/fonts/PressStart2P-Regular.ttf"),
    MontserratRegular: require("@assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("@assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("@assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar style="dark" translucent />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.background,
  },
});
