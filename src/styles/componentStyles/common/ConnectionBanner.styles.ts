import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../../globalStyles/themeColors';

const styles = StyleSheet.create({
  // The container for the connection banner.
  bannerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: themeColors.border,
    backgroundColor: themeColors.primary,
  },

  // The informational text displayed within the banner.
  bannerText: {
    fontSize: 12,
    textAlign: 'center',
    color: themeColors.badgeText, // Use light text for contrast against the primary color.
    // Use the standard body font for readability.
    fontFamily: fonts.bodyMedium,
  },
});

export default styles;