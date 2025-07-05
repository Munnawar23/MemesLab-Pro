import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../globalStyles/themeColors';

const styles = StyleSheet.create({
  // The main container for the screen, covering the full area.
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  // A container used for the empty state, which centers its content.
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: themeColors.background,
  },

  // The style for the Lottie animation displayed in the empty state.
  lottieAnimation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  // The informational text displayed when the favorites list is empty.
  infoText: {
    fontSize: 14,
    color: themeColors.secondaryText,
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: fonts.bodyMedium,
  },

  // Styling for the FlatList content area, providing padding around the grid.
  list: {
    padding: 4,
  },

  // The wrapper for each card in the grid, ensuring proper spacing and sizing.
  cardContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '48%',
  },
});

export default styles;