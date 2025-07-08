import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../../globalStyles/themeColors';

const styles = StyleSheet.create({
  draggableContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  textInputWrapper: {
    alignSelf: 'center',
    maxWidth: '90%',
    padding: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 150,
  },

  memeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    fontFamily: fonts.heading,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },

  closeButtonContainer: {
    position: 'absolute',
    top: -15, 
    left: 0,  
    right: 0,
    alignItems: 'center', 
  },

  closeButton: {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.badgeText,
  },

  closeButtonText: {
    color: themeColors.badgeText,
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
  },

  dragHandle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: themeColors.primary,
  },

  dragHandleTopLeft: { top: -12, left: -12 },
  dragHandleTopRight: { top: -12, right: -12 },
  dragHandleBottomLeft: { bottom: -12, left: -12 },
  dragHandleBottomRight: { bottom: -12, right: -12 },
});

export default styles;