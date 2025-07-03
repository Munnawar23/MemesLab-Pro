import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//Net Info
import { useNetInfo } from '@react-native-community/netinfo';
// Interfaces
import { Meme } from '@interfaces/index';
// Services
import { getMemes } from '@services/memeStorage';
//Components and modals
import ConnectionBanner from '@components/common/ConnectionBanner';
import SavedCard from '@components/cards/SavedCard';
import MemeActionsModal from '@components/modals/MemeActionsModal';
// Styles
import styles from '@styles/screenStyles/MyMemesScreen.styles';

const MyMemesScreen = () => {
  const netInfo = useNetInfo();

  // State to hold list of saved memes
  const [memes, setMemes] = useState<Meme[]>([]);

  // State for pull-to-refresh spinner
  const [refreshing, setRefreshing] = useState(false);

  // State for currently selected meme (for modal actions)
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  // Controls visibility of the MemeActionsModal
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Fetch memes from local storage and update state
   */
  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setMemes(storedMemes);
    };
    fetchMemes();
  }, []);

  /**
   * Reload memes whenever screen gains focus
   */
  useFocusEffect(loadData);

  /**
   * Handler for pull-to-refresh gesture
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  /**
   * Open modal with actions (e.g. delete, share) for a selected meme
   */
  const openActionModal = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalVisible(true);
  };

  /**
   * Close the modal and reset selected meme
   */
  const closeModal = () => {
    setSelectedMeme(null);
    setModalVisible(false);
  };

  /**
   * Render each meme as a card
   */
  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <SavedCard
        image={{ uri: item.imageUri }}
        onPress={() => openActionModal(item)}
        isFavorite={item.isFavorite}
      />
    </View>
  );

  /**
   * If there are no memes saved yet, show an empty state message
   */
  if (!refreshing && memes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't saved any memes yet.</Text>
        <Text style={styles.infoText}>Go to the "Home" tab to make one!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Show banner if offline */}
      <ConnectionBanner />

      {/* List of saved memes */}
      <FlatList
        data={memes} // memes array
        keyExtractor={(item) => item.id} // unique key for each item
        renderItem={renderItem} // how to render each meme
        numColumns={2} // two columns grid
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {/* Modal for actions on selected meme */}
      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setMemes}
      />
    </View>
  );
};

export default MyMemesScreen;
