import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../../globalStyles/themeColors';

const styles = StyleSheet.create({
  // The pressable overlay that covers the screen, used to close the modal.
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  // The modal content container that slides up from the bottom.
  modal: {
    backgroundColor: themeColors.background, // Use the main app background for consistency.
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom for home indicator/safe area.
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'stretch',
  },

  // The title of the action sheet.
  title: {
    fontSize: 18,
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: fonts.heading, // Use the heading font for impact.
  },

  // The confirmation message for the delete action.
  deleteMessage: {
    fontSize: 14,
    color: themeColors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.bodyMedium, // Use the standard body font for clarity.
  },

  // Container for the delete confirmation buttons.
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },

  // A shared style to make buttons in a row expand equally.
  actionButton: {
    flex: 1,
  },

  // Full-screen overlay for the "Deleting..." animation.
  deletingOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFECB3', // soft yellow now
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},

  // The Lottie animation view.
  deletingLottie: {
    width: 150,
    height: 150,
  },

  // The "Deleting..." text shown below the animation.
  deletingTextCenter: {
    marginTop: 20,
    fontSize: 18,
    color: themeColors.badgeText, // Use light text for the dark overlay.
    textAlign: 'center',
    fontFamily: fonts.bodyBold,
  },
});

export default styles;