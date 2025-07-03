import { StyleSheet, Dimensions, Platform } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const { width } = Dimensions.get('window');
const canvasSize = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background, // screen bg
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  memeCanvas: {
    width: canvasSize,
    height: canvasSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.card, // canvas bg
    overflow: 'hidden',
    borderRadius: 8,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  memeText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    fontFamily: Platform.OS === 'ios' ? 'Impact' : 'sans-serif-condensed',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: themeColors.card,
    color: themeColors.text,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default styles;
