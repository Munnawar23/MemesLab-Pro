import React from 'react';
import {Modal,View,Text,TextInput,TouchableOpacity} from 'react-native';

import styles from '@styles/componentStyles/modals/EnterUrlModal.styles';

interface Props {
  visible: boolean; // Modal visibility
  onClose: () => void; // Called when modal is dismissed
  imageUrl: string; // Controlled input value
  onChangeUrl: (text: string) => void; // Input value change handler
  errorText: string; // Displayed below input if error exists
  onSubmit: () => void; // Called when user presses "OK"
}

/**
 * EnterUrlModal Component
 * - Modal popup to input meme image URL
 * - Used for custom image uploads
 */
const EnterUrlModal = ({visible,onClose,imageUrl,onChangeUrl,errorText,onSubmit}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Dimmed background overlay */}
      <View style={styles.modalBackground}>

        {/* Main modal content box */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Image URL</Text>

          {/* Text input field */}
          <TextInput
            style={styles.input}
            placeholder="https://example.com/meme.jpg"
            placeholderTextColor={styles.placeholderColor.color}
            value={imageUrl}
            onChangeText={onChangeUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Optional error message */}
          {errorText ? (
            <Text style={styles.errorText}>{errorText}</Text>
          ) : null}

          {/* Buttons: Cancel and OK */}
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmit} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnterUrlModal;
