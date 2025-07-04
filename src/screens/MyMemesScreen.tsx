import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { Meme } from '@interfaces/index';
import { getMemes } from '@services/memeStorage';
import ConnectionBanner from '@components/common/ConnectionBanner';
import SavedCard from '@components/cards/SavedCard';
import MemeActionsModal from '@components/modals/MemeActionsModal';
import ImportantMessageModal from '@components/modals/ImportantMessageModal';
import styles from '@styles/screenStyles/MyMemesScreen.styles';
import { themeColors } from '@styles/globalStyles/themeColors';

// Defines the structure for the informational modal's state.
type InfoModalState = {
  visible: boolean;
  title: string;
  message: string;
};

const MyMemesScreen = () => {
  const netInfo = useNetInfo();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage the informational/warning modal.
  const [infoModal, setInfoModal] = useState<InfoModalState>({
    visible: false,
    title: '',
    message: '',
  });

  // A helper function to show the offline warning, passed to the MemeActionsModal.
  const showOfflineWarning = () => {
    setInfoModal({
      visible: true,
      title: 'Connection Error',
      message: 'An internet connection is required to share this meme. Please connect and try again.',
    });
  };

  // Loads memes from local device storage.
  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      setRefreshing(true);
      const storedMemes = await getMemes();
      setMemes(storedMemes);
      setRefreshing(false);
    };
    fetchMemes();
  }, []);

  // Reloads data every time the screen comes into focus.
  useFocusEffect(loadData);

  // Handles the "pull to refresh" action.
  const onRefresh = useCallback(() => {
    loadData();
  }, [loadData]);

  // Opens the action modal for a selected meme.
  const openActionModal = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalVisible(true);
  };

  // Closes the action modal and resets the selected meme.
  const closeModal = () => {
    setSelectedMeme(null);
    setModalVisible(false);
  };

  // Renders a single saved meme card in the FlatList.
  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <SavedCard
        image={{ uri: item.imageUri }}
        onPress={() => openActionModal(item)}
        isFavorite={item.isFavorite}
      />
    </View>
  );

  // Renders an empty state message if no memes are saved.
  if (!refreshing && memes.length === 0) {
    return (
      <View style={styles.container}>
        <ConnectionBanner />
        <View style={styles.centered}>
          <LottieView
            source={require('@assets/animations/empty.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.infoText}>You haven't saved any memes yet.</Text>
          <Text style={styles.infoText}>Go create your first one!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConnectionBanner />
      <FlatList
        data={memes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColors.primary} />
        }
      />

      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setMemes}
        netInfo={netInfo}
        onShowOfflineWarning={showOfflineWarning}
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

export default MyMemesScreen;