// Alternative approach using TouchableOpacity for better control
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@styles/componentStyles/modals/ImportantMessageModal.styles';

interface ImportantMessageModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ImportantMessageModal: React.FC<ImportantMessageModalProps> = ({
  visible,
  onClose,
  title,
  message,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>⚠️</Text>
          </View>

          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <TouchableOpacity
            onPress={onClose}
            style={styles.okButton}
          >
            <Text style={styles.buttonText}>Okay, I understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImportantMessageModal;