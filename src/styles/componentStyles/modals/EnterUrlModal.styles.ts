import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../../globalStyles/themeColors';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: themeColors.card,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  modalTitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: themeColors.text,
    fontFamily: fonts.heading,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 14,
    color: themeColors.text,
    borderColor: themeColors.border,
    fontFamily: fonts.bodyMedium,
  },

  errorText: {
    color: '#d63031',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: fonts.bodyMedium,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 8,
  },

  modalButton: {
    flex: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
