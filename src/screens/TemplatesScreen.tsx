import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Constants
import { indianMemes, topTemplates } from '@constants/memes';

// Components
import MemeCard from '@components/cards/TemplateCard';

// Styles
import styles from '@styles/screenStyles/TemplatesScreen.styles';

// Navigation type
type StackParamList = {
  Create: { imageUri: string };
};

const TemplatesScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // This function is the same as on the home screen
  const handleNavigateToCreate = (uri: string) => {
    navigation.navigate('Create', { imageUri: uri });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Indian memes */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Famous Indian Memes</Text>
        <View style={styles.cardsGrid}>
          {indianMemes.map((item, index) => (
            <MemeCard
              key={`indian-${index}`}
              image={item.image}
              title={item.title}
              onPress={() =>
                handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)
              }
            />
          ))}
        </View>
      </View>

      {/* Top templates */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Top Meme Templates</Text>
        <View style={styles.cardsGrid}>
          {topTemplates.map((item, index) => (
            <MemeCard
              key={`template-${index}`}
              image={item.image}
              title={item.title}
              onPress={() =>
                handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TemplatesScreen;