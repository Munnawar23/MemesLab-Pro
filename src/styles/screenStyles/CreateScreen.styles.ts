import { StyleSheet, Dimensions } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const { width, height } = Dimensions.get('window');
const canvasSize = width; // ⬅️ full width, no -40


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    paddingTop: 20
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0, 
  },

  canvasContainer: {
    width: canvasSize,
    height: canvasSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 0,        // ⬅️ no rounded corners
    overflow: 'hidden',
    marginBottom: 0,        // ⬅️ no margin
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  colorPaletteContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },

  paletteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.placeholder,
    marginBottom: 15,
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
    borderColor: 'transparent',
  },

  activeColorSwatch: {
    borderColor: themeColors.primary,
    transform: [{ scale: 1.15 }],
  },

  addTextButton: {
    backgroundColor: themeColors.card,
    borderColor: themeColors.border,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },

  addTextButtonText: {
    color: themeColors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonContainer: {
    width: '90%',
    marginTop: 10,
  },
  headerText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: themeColors.text,
  marginBottom: 20,
  textAlign: 'center',
},
lottieModalContainer: {
    flex: 1,
    backgroundColor: '#2196F3', // Blue background
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
