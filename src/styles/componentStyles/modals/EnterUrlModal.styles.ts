import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // The main container for the modal's content.
  modalContent: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: themeColors.card, // Use the light card color for the background.
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // The title text of the modal.
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    color: themeColors.text,
    fontFamily: fonts.heading, // Use the primary heading font.
  },

  // The text input field for the URL.
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: themeColors.text,
    borderColor: themeColors.border,
    fontFamily: fonts.bodyMedium, // Use the standard body font for input.
  },

  // The style for validation error messages.
  errorText: {
    color: '#d63031', // A standard red for errors is often best for UX.
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: fonts.bodyMedium,
  },

  // Container for the action buttons, aligned to the right.
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 8,
  },

  // Ensures buttons in the row take up equal space.
  modalButton: {
    flex: 1,
  },
});

export default styles;