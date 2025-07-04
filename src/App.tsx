import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import AppNavigator from '@navigation/AppNavigator';
import { themeColors } from '@styles/globalStyles/themeColors';

export default function App() {
  // Load the custom fonts required for the application.
  const [fontsLoaded] = useFonts({
    PressStart2P: require('./assets/fonts/PressStart2P-Regular.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // Display a loading indicator until the fonts are fully loaded.
  // This prevents text from flashing or rendering with a system default font initially.
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
      </View>
    );
  }

  // Once fonts are ready, render the main application structure.
  return (
    <View style={styles.wrapper}>
      {/*
        The StatusBar component controls the system status bar's appearance.
        We let it use the default style for the platform.
      */}
      <StatusBar />

      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // Set the main background color for the entire application.
    backgroundColor: themeColors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // The loading screen should also use the app's background color for a seamless transition.
    backgroundColor: themeColors.background,
  },
});