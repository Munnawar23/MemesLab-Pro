import { StyleSheet, Dimensions } from 'react-native';
import { themeColors, fonts } from '../globalStyles/themeColors';

const { width, height } = Dimensions.get('window');
const canvasSize = width;

const styles = StyleSheet.create({
  // --- Main Structure ---
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 15,
    color: themeColors.text,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fonts.heading,
  },

  // --- Meme Canvas ---
  canvasContainer: {
    width: canvasSize,
    height: canvasSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // The canvas itself has a black background.
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // --- Color Palette ---
  colorPaletteContainer: {
    width: '90%',
    marginBottom: 20,
    alignItems: 'center',
  },
  paletteTitle: {
    fontSize: 16,
    color: themeColors.secondaryText,
    marginBottom: 15,
    fontFamily: fonts.bodyMedium,
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent', // Default state has no border.
  },
  activeColorSwatch: {
    borderColor: themeColors.primary, // The selected color is highlighted.
    transform: [{ scale: 1.15 }],
  },

  // --- Action Buttons ---
  addTextButton: {
    backgroundColor: themeColors.card,
    borderColor: themeColors.border,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  addTextButtonText: {
    color: themeColors.text,
    fontSize: 14,
    fontFamily: fonts.bodyBold, // A bold font for a clear call to action.
  },
  buttonContainer: {
    width: '90%',
    marginTop: 10,
    minHeight: 50, // Ensures layout doesn't shift when switching to spinner.
    justifyContent: 'center',
  },

  // --- Lottie Animation Modal ---
  lottieModalContainer: {
    flex: 1,
    backgroundColor: '#FFECB3', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
  },
  
  lottieWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  
  lottieAnimation: {
    width: Math.min(width * 0.6, 250), // 60% of screen width or max 250px
    height: Math.min(width * 0.6, 250), // Keep it square
    alignSelf: 'center',
  },
});

export default styles;