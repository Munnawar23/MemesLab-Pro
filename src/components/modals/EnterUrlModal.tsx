import React from 'react';
import { Modal, View, Text, TextInput, ActivityIndicator } from 'react-native';
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
  loading: boolean; // New prop
}

// A modal that allows users to input an image URL.
const EnterUrlModal = ({
  visible,
  onClose,
  imageUrl,
  onChangeUrl,
  errorText,
  onSubmit,
  loading,
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
            placeholderTextColor={themeColors.placeholder}
            value={imageUrl}
            onChangeText={onChangeUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}

          <View style={styles.modalButtons}>
            <Button
              label="Cancel"
              onPress={onClose}
              variant="secondary"
              style={styles.modalButton}
              disabled={loading}
            />
            {loading ? (
              <View style={[styles.modalButton, styles.loaderContainer]}>
                <ActivityIndicator size="small" color="black" />
              </View>
            ) : (
              <Button
                label="OK"
                onPress={onSubmit}
                variant="default"
                style={styles.modalButton}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnterUrlModal;
