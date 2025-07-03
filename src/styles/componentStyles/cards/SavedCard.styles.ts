import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: themeColors.card, // card background color
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: themeColors.badgeBackground, // semi-transparent dark
    borderRadius: 12,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 14,
    color: themeColors.badgeText, // white or light color
  },
});

export default styles;
