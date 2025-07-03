import React from 'react';
import {TouchableOpacity,Image,Text,View} from 'react-native';

import styles from '@styles/componentStyles/cards/TemplateCards.styles';
import { themeColors } from '@styles/globalStyles/themeColors'; 

interface Props {
  image: any;              // Image source (require or { uri })
  title: string;           // Text label shown below image
  onPress: () => void;     // Triggered when card is tapped
}

/**
 * TemplateCard Component
 * - Shows a meme template image and title
 * - Triggers navigation/action on tap
 * - Uses static themeColors (no useTheme hook)
 */
const TemplateCard = ({ image, title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      {/* Card Image */}
      <View style={styles.card}>
        <Image source={image} style={styles.cardImage} />
      </View>

      {/* Title below image */}
      <Text style={[styles.cardTitle, { color: themeColors.text }]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TemplateCard;
