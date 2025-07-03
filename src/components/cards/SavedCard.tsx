import React from 'react';
import { TouchableOpacity, Image, View, Text, ImageSourcePropType } from 'react-native';
import styles from '@styles/componentStyles/cards/SavedCard.styles';

interface Props {
  image: ImageSourcePropType;  // Image source (local or uri)
  onPress: () => void;         // Called when user taps the card
  isFavorite?: boolean;        // Optional: show favorite badge
}

/**
 * SavedCard Component
 * - Displays a saved meme image in a square card
 * - Shows ❤️ badge if marked as favorite
 */
const SavedCard = ({ image, onPress, isFavorite }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {/* Meme image */}
    <Image source={image} style={styles.image} />

    {/* Optional Favorite Badge */}
    {isFavorite && (
      <View style={styles.favoriteBadge}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default SavedCard;
