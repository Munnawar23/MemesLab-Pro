import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '../globalStyles/themeColors';

const styles = StyleSheet.create({
  // The main container for the screen.
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

  // Defines the inner padding for the FlatList content area.
  scrollContent: {
    paddingHorizontal: 15, // A little less horizontal padding for a 2-column grid.
    paddingTop: 20,
    paddingBottom: 30,
  },

  // A container for the header content.
  subsection: {
    marginBottom: 10,
  },

  // A style rule for the wrapper of each row in the two-column grid.
  flatListRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  // The container for the "More coming soon..." message at the end of the list.
  footer: {
    marginTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },

  // The text style for the footer message.
  footerText: {
    fontSize: 12,
    color: themeColors.secondaryText,
    fontFamily: fonts.heading,
  },
});

export default styles;