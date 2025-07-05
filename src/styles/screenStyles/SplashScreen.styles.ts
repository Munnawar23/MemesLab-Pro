import { StyleSheet, Dimensions } from 'react-native';
import { themeColors } from '../globalStyles/themeColors';

const { width } = Dimensions.get('window');

// The styles for the SplashScreen component.
const styles = StyleSheet.create({
  // The main container that fills the screen and centers the animation.
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // A style to define the size of the Lottie animation view.
  // It's sized relative to the screen width for responsiveness.
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
});

export default styles;