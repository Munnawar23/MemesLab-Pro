import { StyleSheet } from 'react-native';
import { themeColors } from '../globalStyles/themeColors'; // static theme colors

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: themeColors.background,
  },
  infoText: {
    fontSize: 18,
    color: themeColors.secondaryText,
    textAlign: 'center',
    lineHeight: 26,
  },
  list: {
    padding: 4,
  },
  cardContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '48%',
  },
});

export default styles;
