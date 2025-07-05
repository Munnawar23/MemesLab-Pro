import React from 'react';
import { Modal, View, Text, TextInput } from 'react-native';
import Button from '@components/common/Button';
import styles from '@styles/componentStyles/modals/EnterUrlModal.styles';
import { themeColors } from '../../styles/globalStyles/themeColors'; 

interface Props {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
  onChangeUrl: (text: string) => void;
  errorText: string;
  onSubmit: () => void;
}

// A modal that allows users to input an image URL.
const EnterUrlModal = ({
  visible,
  onClose,
  imageUrl,
  onChangeUrl,
  errorText,
  onSubmit,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Image URL</Text>

          <TextInput
            style={styles.input}
            placeholder="https://example.com/meme.jpg"
            // Use the placeholder color directly from the theme object.
            placeholderTextColor={themeColors.placeholder}
            value={imageUrl}
            onChangeText={onChangeUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          {/* Display an error message if one is provided. */}
          {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}

          <View style={styles.modalButtons}>
            <Button
              label="Cancel"
              onPress={onClose}
              variant="secondary"
              style={styles.modalButton}
            />
            <Button
              label="OK"
              onPress={onSubmit}
              variant="default"
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnterUrlModal;