import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  bannerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: themeColors.border,
    backgroundColor: themeColors.primary, 
  },
  bannerText: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    color: themeColors.text, 
  },
});

export default styles;
