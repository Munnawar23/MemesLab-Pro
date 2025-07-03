import React, { useState } from 'react';
import { Modal, Pressable, Text, View, Alert } from 'react-native';
//File and sharing
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
//Net Info
import { useNetInfo } from '@react-native-community/netinfo';
//Interfaces
import { Meme } from '@interfaces/index';
//Services
import { deleteMeme, toggleFavoriteStatus } from '@services/memeStorage';
//Components
import Button from '@components/common/Button';
//Styles
import styles from '@styles/componentStyles/modals/MemeActionsModal.style';

interface Props {
  visible: boolean; // Whether the modal is currently shown
  onClose: () => void; // Function to close the modal
  meme: Meme | null; // The currently selected meme
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>; // Function to update meme list in parent
}

/**
 * MemeActionsModal Component
 * ----------------------------------------
 * Shows a modal with actions for a selected meme:
 *   - Add/Remove from Favorites
 *   - Share the Meme
 *   - Delete the Meme
 * It also handles network state for sharing.
 */
const MemeActionsModal = ({ visible, onClose, meme, setMemes }: Props) => {
  const netInfo = useNetInfo(); // network info hook
  const [isSharing, setIsSharing] = useState(false); // to disable while sharing

  /**
   * Deletes the selected meme after confirmation dialog.
   */
  const handleDelete = async () => {
    if (!meme) return;

    Alert.alert('Delete Meme', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel', onPress: onClose },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMeme(meme.id);
            setMemes((prev) => prev.filter((m) => m.id !== meme.id));
            onClose();
            Alert.alert('Success', 'Meme deleted!');
          } catch {
            Alert.alert('Error', 'Failed to delete meme.');
          }
        },
      },
    ]);
  };

  /**
   * Toggles the favorite status of the selected meme.
   */
  const handleToggleFavorite = async () => {
    if (!meme) return;

    try {
      await toggleFavoriteStatus(meme.id);
      setMemes((prev) =>
        prev.map((m) => (m.id === meme.id ? { ...m, isFavorite: !m.isFavorite } : m))
      );
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to update favorite.');
    }
  };

  /**
   * Shares the selected meme using the system share sheet.
   * Downloads first if the image is a remote URL.
   */
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

      // If remote URL, download to cache directory
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
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Overlay background */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Modal card */}
        <Pressable style={styles.modal}>
          <Text style={styles.title}>Meme Actions</Text>

          {/* Favorite toggle */}
          <Button
            label={meme?.isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            onPress={handleToggleFavorite}
            disabled={isSharing}
          />

          {/* Share */}
          <Button
            label={isSharing ? 'Sharing...' : '📤 Share Meme'}
            onPress={handleShareMeme}
            disabled={isSharing}
          />

          {/* Delete */}
          <Button
            label="🗑️ Delete Meme"
            onPress={handleDelete}
            style={{ backgroundColor: '#ff3b30' }}
            disabled={isSharing}
          />

          {/* Cancel */}
          <Button
            label="Cancel"
            onPress={onClose}
            style={styles.cancelButton}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MemeActionsModal;
