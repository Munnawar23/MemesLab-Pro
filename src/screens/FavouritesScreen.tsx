import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//Services
import { getMemes } from '@services/memeStorage';
//Interfaces
import { Meme } from '@interfaces/index';
//Components
import SavedCard from '@components/cards/SavedCard';
import ConnectionBanner from '@components/common/ConnectionBanner';
//Modals
import MemeActionsModal from '@components/modals/MemeActionsModal';
//Styles
import styles from '@styles/screenStyles/FavoritesScreen.styles';


const FavoritesScreen = () => {
  const [allMemes, setAllMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Fetch all memes from AsyncStorage and save to state.
   * useCallback ensures the function is stable between renders.
   */
  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setAllMemes(storedMemes);
    };
    fetchMemes();
  }, []);

  /**
   * When this screen is focused, load memes.
   */
  useFocusEffect(loadData);

  /**
   * Refresh handler for pull-to-refresh.
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  /**
   * Open action modal for a selected meme.
   */
  const openActionModal = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalVisible(true);
  };

  /**
   * Close the modal.
   */
  const closeModal = () => {
    setModalVisible(false);
    setSelectedMeme(null);
  };

  /**
   * Filter only favorited memes.
   */
  const favoriteMemes = allMemes.filter(meme => meme.isFavorite);

  /**
   * Render each meme card.
   */
  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <SavedCard image={{ uri: item.imageUri }} onPress={() => openActionModal(item)} />
    </View>
  );

  /**
   * Show empty state if no favorites.
   */
  if (!refreshing && favoriteMemes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>You haven't favorited any memes yet.</Text>
        <Text style={styles.infoText}>Go to the "My Memes" tab to add some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMemes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#84cc16" />
        }
      />
      <MemeActionsModal
        visible={modalVisible}
        onClose={closeModal}
        meme={selectedMeme}
        setMemes={setAllMemes}
      />
    </View>
  );
};

export default FavoritesScreen;
