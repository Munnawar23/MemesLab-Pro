import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors'; // Static color palette

/**
 * Styles for EnterUrlModal component
 * - Uses themeColors directly for consistency
 * - No dynamic theming (light/dark), just readable and reusable colors
 */
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent', // semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: themeColors.secondaryText, // use theme card background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: themeColors.text, // heading text color
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: themeColors.text,
    borderColor: themeColors.border,
  },
  placeholderColor: {
    color: themeColors.placeholder,
  },
  errorText: {
    color: '#ff4444', // hardcoded red for error
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 8,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.primary, // button text using primary color
  },
});

export default styles;
