import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors'; // Static color palette

const styles = StyleSheet.create({
  // Wrapper for card and title
  cardContainer: {
    width: '47%',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Card box with image, shadow, and rounded corners
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: themeColors.placeholder, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  // Image inside the card
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Title text below the image
  cardTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: themeColors.text, // Text color from static theme
  },
});

export default styles;
