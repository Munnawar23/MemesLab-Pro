import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ImageSourcePropType, // A better type than 'any' for image sources.
} from 'react-native';
import styles from '@styles/componentStyles/cards/TemplateCard.styles';

interface Props {
  image: ImageSourcePropType;
  title: string;
  onPress: () => void;
}

// Renders a meme template card with an image and a title below it.
// Designed to be used in a two-column grid.
const TemplateCard = ({ image, title, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer} activeOpacity={0.8}>
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
    </View>
    <Text style={styles.cardTitle} numberOfLines={1}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default TemplateCard;