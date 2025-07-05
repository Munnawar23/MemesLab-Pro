import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../../globalStyles/themeColors';

export const styles = StyleSheet.create({
  // A dark, semi-transparent overlay that covers the entire screen.
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // The main pop-up container with the message content.
  modalContainer: {
    backgroundColor: themeColors.card,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  // The circular container for the large icon at the top of the modal.
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  // The emoji icon itself. No font family is applied to ensure it renders correctly.
  iconText: {
    fontSize: 40,
  },

  // The main title of the modal.
  modalTitle: {
    fontSize: 15,
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fonts.heading, // Use the primary heading font.
  },

  // The descriptive message text.
  modalMessage: {
    fontSize: 14,
    color: themeColors.secondaryText, // Use secondary text color for readability.
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
    fontFamily: fonts.bodyMedium, // Use the standard body font.
  },

  okButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: themeColors.badgeText,
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    textAlign: 'center',
    fontWeight: '600',
  },
});