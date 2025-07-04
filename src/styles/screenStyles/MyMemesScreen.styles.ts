import { StyleSheet } from 'react-native';
import { themeColors } from '../globalStyles/themeColors'; // static theme colors

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: themeColors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: themeColors.background,
  },
  // --- NEW STYLE FOR THE LOTTIE ANIMATION ---
  lottieAnimation: {
    width: 250,
    height: 250,
    marginBottom: 20, // Adds space between the animation and the text
  },
  infoText: {
    fontSize: 18,
    color: themeColors.placeholder, // Using a slightly dimmer color
    textAlign: 'center',
    lineHeight: 26,
  },
  list: {
    padding: 4,
  },
  cardContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '48%',
  },
});

export default styles;