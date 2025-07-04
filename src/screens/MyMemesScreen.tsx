import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // --- IMPORT LOTTIE ---

// Net Info
import { useNetInfo } from '@react-native-community/netinfo';
// Interfaces
import { Meme } from '@interfaces/index';
// Services
import { getMemes } from '@services/memeStorage';
// Components and modals
import ConnectionBanner from '@components/common/ConnectionBanner';
import SavedCard from '@components/cards/SavedCard';
import MemeActionsModal from '@components/modals/MemeActionsModal';
// Styles
import styles from '@styles/screenStyles/MyMemesScreen.styles';

const MyMemesScreen = () => {
  const netInfo = useNetInfo();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadData = useCallback(() => {
    const fetchMemes = async () => {
      const storedMemes = await getMemes();
      setMemes(storedMemes);
    };
    fetchMemes();
  }, []);

  useFocusEffect(loadData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  const openActionModal = (meme: Meme) => {
    setSelectedMeme(meme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMeme(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Meme }) => (
    <View style={styles.cardContainer}>
      <SavedCard
        image={{ uri: item.imageUri }}
        onPress={() => openActionModal(item)}
        isFavorite={item.isFavorite}
      />
    </View>
  );

  // --- UPDATED EMPTY STATE VIEW ---
  if (!refreshing && memes.length === 0) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require('@assets/animations/empty.json')} // Your animation
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
        <Text style={styles.infoText}>You haven't saved any memes yet.</Text>
        <Text style={styles.infoText}>Go create your first one!</Text>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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