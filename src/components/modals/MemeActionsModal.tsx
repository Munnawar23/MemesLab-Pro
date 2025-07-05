import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';
import { NetInfoState } from '@react-native-community/netinfo';

import { Meme } from '@interfaces/index';
import { deleteMeme, toggleFavoriteStatus } from '@services/memeStorage';
import Button from '@components/common/Button';
import styles from '@styles/componentStyles/modals/MemeActionsModal.style';

interface Props {
  visible: boolean;
  onClose: () => void;
  meme: Meme | null;
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
  netInfo: NetInfoState;
  onShowOfflineWarning: () => void;
}

// A modal that presents actions for a selected meme (share, favorite, delete).
const MemeActionsModal: React.FC<Props> = ({
  visible,
  onClose,
  meme,
  setMemes,
  netInfo,
  onShowOfflineWarning,
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Resets all local state before closing the modal.
  const handleClose = () => {
    setConfirmingDelete(false);
    setIsDeleting(false);
    onClose();
  };

  // State transitions for the delete confirmation flow.
  const handleDeletePress = () => setConfirmingDelete(true);
  const handleCancelDelete = () => setConfirmingDelete(false);

  // Deletes the meme from storage and updates the app's state.
  const handleConfirmDelete = async () => {
    if (!meme) return;
    setIsDeleting(true); // Triggers the "Deleting..." animation overlay.

    // A brief timeout provides visual feedback to the user.
    setTimeout(async () => {
      try {
        await deleteMeme(meme.id);
        setMemes((prev) => prev.filter((m) => m.id !== meme.id));
      } finally {
        handleClose(); // Close all modals after deletion.
      }
    }, 1500);
  };

  // Toggles the favorite status of the meme.
  const handleToggleFavorite = async () => {
    if (!meme) return;
    try {
      await toggleFavoriteStatus(meme.id);
      setMemes((prev) =>
        prev.map((m) =>
          m.id === meme.id ? { ...m, isFavorite: !m.isFavorite } : m
        )
      );
    } finally {
      handleClose();
    }
  };

  // Shares the meme image using the native sharing dialog.
  const handleShareMeme = async () => {
    if (!meme) return;

    // Prevents sharing if there's no internet connection.
    if (!netInfo.isConnected) {
      onShowOfflineWarning();
      handleClose();
      return;
    }

    setIsSharing(true);

    if (!(await Sharing.isAvailableAsync())) {
      alert(`Sharing isn't available on your device.`);
      setIsSharing(false);
      return;
    }

    try {
      let localUri = meme.imageUri;
      // If the image is a remote URL, download it to a temporary local file first.
      if (localUri.startsWith('http')) {
        const download = await FileSystem.downloadAsync(
          meme.imageUri,
          `${FileSystem.cacheDirectory}meme_${Date.now()}.jpg`
        );
        localUri = download.uri;
      }
      await Sharing.shareAsync(localUri);
    } catch (error) {
      console.error('Sharing failed:', error);
    } finally {
      setIsSharing(false);
      handleClose();
    }
  };

  return (
    <>
      {/* The main action sheet modal */}
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          {/* Using a Pressable for the modal content prevents the overlay's onPress from firing */}
          <Pressable style={styles.modal}>
            <Text style={styles.title}>
              {confirmingDelete ? 'Delete Meme' : 'Options'}
            </Text>

            {confirmingDelete ? (
              // The delete confirmation view
              <>
                <Text style={styles.deleteMessage}>
                  Are you sure you want to delete this meme?
                </Text>
                <View style={styles.deleteButtonContainer}>
                  <Button
                    label="Cancel"
                    onPress={handleCancelDelete}
                    style={styles.actionButton}
                  />
                  <Button
                    label="Delete"
                    onPress={handleConfirmDelete}
                    variant="danger" // Destructive 'delete' button
                    style={styles.actionButton}
                  />
                </View>
              </>
            ) : (
              // The default list of actions
              <>
                <Button
                  label={meme?.isFavorite ? 'Remove from ❤️' : 'Add to ❤️'}
                  onPress={handleToggleFavorite}
                  disabled={isSharing}
                  variant="default"
                />
                <Button
                  label={isSharing ? 'Sharing...' : '📤 Share Meme'}
                  onPress={handleShareMeme}
                  disabled={isSharing}
                  loading={isSharing} // Show spinner inside button
                  variant="default"
                />
                <Button
                  label="🗑️ Delete Meme"
                  onPress={handleDeletePress}
                  variant="danger"
                  disabled={isSharing}
                />
                <Button
                  label="Cancel"
                  onPress={handleClose}
                />
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* The full-screen overlay for the delete animation */}
      <Modal
        visible={isDeleting}
        transparent
        animationType="fade"
        onRequestClose={() => {}} // Disallow closing while deleting
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