import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  // The main container that is positioned absolutely and can be moved.
  draggableContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  // A wrapper around the text input, providing a dashed border for visual guidance.
  textInputWrapper: {
    width: '85%',
    padding: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent for subtlety.
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background.
  },

  // The style for the meme text itself.
  memeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    // Use the impactful heading font for meme text.
    fontFamily: fonts.heading,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },

  // The central close (x) button positioned above the text input.
  closeButtonCenter: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{ translateX: -10 }],
    backgroundColor: themeColors.text, // Dark background.
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.badgeText, // Contrasting border.
  },

  // The 'x' character inside the close button.
  closeButtonText: {
    color: themeColors.badgeText, // Light text for contrast.
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
  },

  // The generic style applied to all four drag handles.
  dragHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },

  // The icon inside the drag handle.
  dragHandleIcon: {
    fontSize: 10,
    color: themeColors.badgeText, // Light color for visibility.
    fontWeight: 'bold',
  },

  // Position for the top-left drag handle.
  dragHandleTopLeft: {
    top: -10,
    left: -10,
  },

  // Position for the top-right drag handle.
  dragHandleTopRight: {
    top: -10,
    right: -10,
  },

  // Position for the bottom-left drag handle.
  dragHandleBottomLeft: {
    bottom: -10,
    left: -10,
  },

  // Position for the bottom-right drag handle.
  dragHandleBottomRight: {
    bottom: -10,
    right: -10,
  },
});

export default styles;