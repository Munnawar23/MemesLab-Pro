import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native';
import styles from '@styles/componentStyles/cards/SavedCard.styles';

interface Props {
  image: ImageSourcePropType;
  onPress: () => void;
  isFavorite?: boolean;
}

// Renders a square card for a saved item, typically used in a grid layout.
// Displays a favorite badge if the item is marked as a favorite.
const SavedCard = ({ image, onPress, isFavorite }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Image source={image} style={styles.image} />

    {/* Conditionally render the favorite badge in the top-right corner. */}
    {isFavorite && (
      <View style={styles.favoriteBadge}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default SavedCard;