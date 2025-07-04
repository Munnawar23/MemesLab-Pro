// Fixed version using TouchableOpacity for better button control
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@styles/componentStyles/modals/ImportantMessageModal.styles';

interface InternetWarningModalProps {
  visible: boolean;
  onClose: () => void;
}

const InternetWarningModal: React.FC<InternetWarningModalProps> = ({
  visible,
  onClose,
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
            {/* Using an emoji for the icon. */}
            <Text style={styles.iconText}>📶</Text>
          </View>

          <Text style={styles.modalTitle}>No Internet Connection</Text>

          <Text style={styles.modalMessage}>
            You don't have an internet connection. You can only view memes — creating and sharing is unavailable until you reconnect.
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={styles.okButton}
          >
            <Text style={styles.buttonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InternetWarningModal;