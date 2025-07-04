import { StyleSheet } from 'react-native';
import { themeColors, fonts } from '@styles/globalStyles/themeColors'; // Import both colors and fonts

const styles = StyleSheet.create({
  // The main card container.
  card: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1, // Ensures the card is always a perfect square.
    backgroundColor: themeColors.card,
    borderWidth: 1,
    borderColor: themeColors.border,
  },

  // The image fills the entire card.
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // The circular badge for the favorite indicator.
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: themeColors.badgeBackground,
    height: 24,
    width: 24,
    borderRadius: 12, // Half of height/width to make it a circle.
    justifyContent: 'center',
    alignItems: 'center',
  },

  // The favorite icon (emoji) itself.
  favoriteIcon: {
    fontSize: 12,
    // Note: We do not set a fontFamily for emojis.
    // Emojis use the native system font to render correctly.
    // Forcing a custom font like 'PressStart2P' will cause them to break or not display.
  },
});

export default styles;