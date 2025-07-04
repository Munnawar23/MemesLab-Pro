import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  // The base style for all button variants.
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 50, // Ensures consistent height even when loading.
  },

  // The style for the text label inside the button.
  buttonText: {
    color: themeColors.badgeText, // White text contrasts well on all variants.
    fontSize: 16,
    // Use the heading font for a distinct, impactful button label.
    fontFamily: fonts.heading,
  },

  // The 'default' variant uses the app's accent color for primary actions.
  defaultButton: {
    backgroundColor: themeColors.accent,
  },

  // The 'secondary' variant uses a neutral gray for less prominent actions.
  // This is a good choice for 'Cancel' or alternative options.
  secondaryButton: {
    backgroundColor: themeColors.quizButtonDefault,
  },

  // The 'danger' variant uses a distinct red for destructive actions.
  dangerButton: {
    backgroundColor: '#d63031', // A specific red for warning/danger states.
  },
});

export default styles;