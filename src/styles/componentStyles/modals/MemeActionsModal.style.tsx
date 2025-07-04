import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modal: {
    backgroundColor: themeColors.secondaryText,
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: themeColors.border,
  },
  deleteMessage: {
    fontSize: 16,
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  cancelDeleteButton: {
    backgroundColor: themeColors.border,
    flex: 1,
  },
  confirmDeleteButton: {
    backgroundColor: '#ff3b30',
    flex: 1,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottieAnimation: {
    width: 100,
    height: 100,
  },
  deletingText: {
    fontSize: 16,
    color: themeColors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  deletingOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.7)',
},
deletingLottie: {
  width: 150,
  height: 150,
},
deletingTextCenter: {
  marginTop: 20,
  fontSize: 18,
  color: '#fff',
  textAlign: 'center',
},
});

export default styles;
