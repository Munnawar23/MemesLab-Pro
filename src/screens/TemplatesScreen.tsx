import React, { useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { allMemes } from '@constants/memes';
import MemeCard from '@components/cards/TemplateCard';
import ConnectionBanner from '@components/common/ConnectionBanner';
import ImportantMessageModal from '@components/modals/ImportantMessageModal';
import styles from '@styles/screenStyles/TemplatesScreen.styles';

// Defines the navigation stack parameters for type-safe navigation.
type StackParamList = {
  Create: { imageUri: string };
};

// Defines the structure for the informational modal's state.
type InfoModalState = {
  visible: boolean;
  title: string;
  message: string;
};

const TemplatesScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const netInfo = useNetInfo();

  const [infoModal, setInfoModal] = useState<InfoModalState>({
    visible: false,
    title: '',
    message: '',
  });

  // Displays a modal informing the user that an action requires an internet connection.
  const showOfflineWarning = () => {
    setInfoModal({
      visible: true,
      title: 'Connection Error',
      message: 'An internet connection is required to use this template. Please check your connection and try again.',
    });
  };

  // A higher-order function that wraps an action with a network connectivity check.
  const withNetworkCheck = (action: () => void) => {
    return () => {
      if (netInfo.isConnected) {
        action();
      } else {
        showOfflineWarning();
      }
    };
  };

  // Navigates to the meme creation screen with the selected template's image URI.
  const handleNavigateToCreate = (uri: string) => {
    navigation.navigate('Create', { imageUri: uri });
  };

  // Renders a single meme template card in the FlatList.
  const renderItem = ({ item }: { item: typeof allMemes[0] }) => (
    <MemeCard
      image={item.image}
      title={item.title}
      onPress={withNetworkCheck(() =>
        handleNavigateToCreate(Image.resolveAssetSource(item.image).uri)
      )}
    />
  );

  return (
    <View style={styles.container}>
      <ConnectionBanner />

      <FlatList
        data={allMemes}
        renderItem={renderItem}
        keyExtractor={(_, index) => `meme-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.flatListRow}
        contentContainerStyle={styles.scrollContent}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>✨ More coming soon…</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <ImportantMessageModal
        visible={infoModal.visible}
        title={infoModal.title}
        message={infoModal.message}
        onClose={() => setInfoModal({ ...infoModal, visible: false })}
      />
    </View>
  );
};

export default TemplatesScreen;