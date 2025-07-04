import React from 'react';
import { View } from 'react-native';
import { useNavigation, StackActions, NavigationProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import styles from '@styles/screenStyles/SplashScreen.styles';

// Defines the navigation stack for type-safe navigation actions.
type RootStackParamList = {
  Main: undefined;
};

// The splash screen displays a full-screen animation upon app launch.
// It automatically navigates to the main app content once the animation completes.
const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // This function is called exactly once when the Lottie animation finishes playing.
  // It replaces the current screen with the main app navigator.
  const onAnimationFinish = () => {
    navigation.dispatch(StackActions.replace('Main'));
  };

  return (
    <View style={styles.container}>
      <LottieView
        // The source of the animation file.
        source={require('@assets/animations/splash.json')}
        // A dedicated style to control the animation's size.
        style={styles.animation}
        // Tells the animation to start playing as soon as it's ready.
        autoPlay
        // Ensures the animation plays only one time.
        loop={false}
        // The callback function that triggers navigation after the animation.
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

export default SplashScreen;