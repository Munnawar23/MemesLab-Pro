import { StyleSheet } from 'react-native';
import { themeColors } from '@styles/globalStyles/themeColors';

/**
 * Styles for MemeActionsModal
 */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
  },
  modal: {
    backgroundColor: themeColors.card,
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
});

export default styles;
