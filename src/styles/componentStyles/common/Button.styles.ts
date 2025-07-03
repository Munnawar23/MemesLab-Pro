import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

/**
 * Styles for Button component
 * Includes variants: default, secondary, danger
 */
const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  // Text style
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Variant backgrounds
  defaultButton: {
    backgroundColor: themeColors.primary,
  },
  secondaryButton: {
    backgroundColor: themeColors.border,
  },
  dangerButton: {
    backgroundColor: '#d63031', 
  },
});

export default styles;
