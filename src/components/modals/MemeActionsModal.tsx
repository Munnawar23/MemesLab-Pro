import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useNetInfo } from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

import { Meme } from '@interfaces/index';
import { deleteMeme, toggleFavoriteStatus } from '@services/memeStorage';
import Button from '@components/common/Button';
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
      } catch {
        setIsDeleting(false);
        handleClose();
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
      handleClose();
    }
  };

  const handleShareMeme = async () => {
    if (!meme) return;

    if (!netInfo.isConnected) return;

    setIsSharing(true);

    const available = await Sharing.isAvailableAsync();
    if (!available) {
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
    } finally {
      setIsSharing(false);
      handleClose();
    }
  };

  return (
    <>
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

            {confirmingDelete ? (
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

      {/* Fullscreen Delete Animation */}
      <Modal
        visible={isDeleting}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.deletingOverlay}>
          <LottieView
            source={require('@assets/animations/delete.json')}
            autoPlay
            loop={false}
            style={styles.deletingLottie}
          />
          <Text style={styles.deletingTextCenter}>Deleting...</Text>
        </View>
      </Modal>
    </>
  );
};

export default MemeActionsModal;
