import { StyleSheet } from 'react-native';
import { themeColors } from '../globalStyles/themeColors';

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  // Centered message when no favorites
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: themeColors.background,
  },

  // Text for empty state
  infoText: {
    fontSize: 18,
    color: themeColors.secondaryText,
    textAlign: 'center',
    lineHeight: 26,
  },

  // FlatList content container
  list: {
    padding: 4,
  },

  // Meme card wrapper
  cardContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '48%',
  },
});

export default styles;
