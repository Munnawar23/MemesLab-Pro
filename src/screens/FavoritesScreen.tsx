import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { Meme } from '@interfaces/index';
import { getMemes } from '@services/memeStorage';
import SavedCard from '@components/cards/SavedCard';
import ConnectionBanner from '@components/common/ConnectionBanner';
import MemeActionsModal from '@components/modals/MemeActionsModal';
import ImportantMessageModal from '@components/modals/ImportantMessageModal';
import styles from '@styles/screenStyles/FavoritesScreen.styles';
import { themeColors } from '../styles/globalStyles/themeColors';

// Defines the structure for the informational modal's state.
type InfoModalState = {
  visible: boolean;
  title: string;
  message: string;
};

const FavoritesScreen = () => {
  const netInfo = useNetInfo();
  const [allMemes, setAllMemes] = useState<Meme[]>([]);
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

  // Loads all memes from local device storage.
  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      setRefreshing(true);
      const storedMemes = await getMemes();
      setAllMemes(storedMemes);
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
    setModalVisible(false);
    setSelectedMeme(null);
  };

  // Filters the full list of memes to get only the favorites.
  const favoriteMemes = allMemes.filter((meme) => meme.isFavorite);

  // Renders a single favorite meme card in the FlatList.
  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <SavedCard
        image={{ uri: item.imageUri }}
        onPress={() => openActionModal(item)}
        isFavorite={true} // All items on this screen are favorites.
      />
    </View>
  );

  // Renders an empty state message if no memes have been favorited.
  if (!refreshing && favoriteMemes.length === 0) {
    return (
      <View style={styles.container}>
        <ConnectionBanner />
        <View style={styles.centered}>
          <LottieView
            source={require('@assets/animations/empty2.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.infoText}>You haven't favorited any memes yet.</Text>
          <Text style={styles.infoText}>Go to "My Memes" to add some!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConnectionBanner />
      <FlatList
        data={favoriteMemes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.primary} // Uses the theme's primary color for the spinner.
          />
        }
      />

      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setAllMemes} // Passes the state setter to update the list when an item is changed.
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

export default FavoritesScreen;