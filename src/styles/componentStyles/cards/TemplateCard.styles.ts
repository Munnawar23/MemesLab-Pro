import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors'; // Import both colors and fonts

const styles = StyleSheet.create({
  // Outer container for the card and its title.
  // Sized to fit two cards per row with spacing.
  cardContainer: {
    width: '48%', // Use 48% to allow for space-between justification in the parent.
    marginBottom: 20,
  },

  // The interactive card element containing the image.
  // Includes rounded corners and a subtle shadow for depth.
  card: {
    width: '100%',
    aspectRatio: 1, // Maintain a square shape.
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: themeColors.placeholder, // Used as a fallback while the image loads.
    elevation: 3, // Android shadow.
    shadowColor: '#000', // iOS shadow.
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // The template image itself, covers the entire card area.
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // The title text displayed below the card.
  cardTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: themeColors.text,
    // Use the medium-weight body font from our central font definition.
    fontFamily: fonts.bodyMedium,
  },
});

export default styles;