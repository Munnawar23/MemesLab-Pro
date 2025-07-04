import React, { useState } from 'react';
import { Modal, Pressable, Text, View, Alert } from 'react-native';
// File and sharing
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
// Net Info
import { useNetInfo } from '@react-native-community/netinfo';
// Lottie Animation
import LottieView from 'lottie-react-native';
// Interfaces
import { Meme } from '@interfaces/index';
// Services
import { deleteMeme, toggleFavoriteStatus } from '@services/memeStorage';
// Components
import Button from '@components/common/Button';
// Styles
import styles from '@styles/componentStyles/modals/MemeActionsModal.style';

interface Props {
  visible: boolean;
  onClose: () => void;
  meme: Meme | null;
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

const MemeActionsModal = ({ visible, onClose, meme, setMemes }: Props) => {
  const netInfo = useNetInfo();
  const [isSharing, setIsSharing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setConfirmingDelete(false);
    setIsDeleting(false);
    onClose();
  };

  const handleDeletePress = () => {
    setConfirmingDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmingDelete(false);
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (!meme) return;

    setIsDeleting(true);

    setTimeout(async () => {
      try {
        await deleteMeme(meme.id);
        setMemes((prev) => prev.filter((m) => m.id !== meme.id));
        setIsDeleting(false);
        handleClose();
        Alert.alert('Success', 'Meme deleted!');
      } catch {
        Alert.alert('Error', 'Failed to delete meme.');
        setIsDeleting(false);
      }
    }, 2000);
  };

  const handleToggleFavorite = async () => {
    if (!meme) return;

    try {
      await toggleFavoriteStatus(meme.id);
      setMemes((prev) =>
        prev.map((m) => (m.id === meme.id ? { ...m, isFavorite: !m.isFavorite } : m))
      );
      handleClose();
    } catch {
      Alert.alert('Error', 'Failed to update favorite.');
    }
  };

  const handleShareMeme = async () => {
    if (!meme) return;

    if (!netInfo.isConnected) {
      Alert.alert('No Internet Connection', 'You need internet to share memes.');
      return;
    }

    setIsSharing(true);

    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Error', 'Sharing is not available.');
      setIsSharing(false);
      return;
    }

    try {
      let localUri = meme.imageUri;

      if (localUri.startsWith('http')) {
        const download = await FileSystem.downloadAsync(
          meme.imageUri,
          `${FileSystem.cacheDirectory}meme_${Date.now()}.jpg`
        );
        localUri = download.uri;
      }

      await Sharing.shareAsync(localUri);
    } catch {
      Alert.alert('Error', 'Sharing failed.');
    } finally {
      setIsSharing(false);
      handleClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.modal}>
          <Text style={styles.title}>
            {confirmingDelete ? 'Delete Meme' : 'Meme Actions'}
          </Text>

          {isDeleting ? (
            <View style={styles.animationContainer}>
              <LottieView
                source={require('@assets/animations/delete.json')}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
              />
              <Text style={styles.deletingText}>Deleting...</Text>
            </View>
          ) : confirmingDelete ? (
            <>
              <Text style={styles.deleteMessage}>
                Are you sure you want to delete this meme?
              </Text>
              <View style={styles.deleteButtonContainer}>
                <Button
                  label="Cancel"
                  onPress={handleCancelDelete}
                  style={styles.cancelDeleteButton}
                />
                <Button
                  label="Delete"
                  onPress={handleConfirmDelete}
                  style={styles.confirmDeleteButton}
                />
              </View>
            </>
          ) : (
            <>
              <Button
                label={meme?.isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                onPress={handleToggleFavorite}
                disabled={isSharing}
              />
              <Button
                label={isSharing ? 'Sharing...' : '📤 Share Meme'}
                onPress={handleShareMeme}
                disabled={isSharing}
              />
              <Button
                label="🗑️ Delete Meme"
                onPress={handleDeletePress}
                style={{ backgroundColor: '#ff3b30' }}
                disabled={isSharing}
              />
              <Button
                label="Cancel"
                onPress={handleClose}
                style={styles.cancelButton}
              />
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MemeActionsModal;
