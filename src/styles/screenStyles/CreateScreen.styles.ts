import { StyleSheet, Dimensions } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const { width } = Dimensions.get('window');
const canvasSize = width; // ⬅️ full width, no -40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0, // ⬅️ remove padding
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
    width: '100%',
    marginTop: 10,
  },
});

export default styles;
