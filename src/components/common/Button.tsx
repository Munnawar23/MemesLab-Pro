import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import styles from '@styles/componentStyles/common/Button.styles';
import { themeColors } from '@styles/globalStyles/themeColors'; // Import theme for the spinner color

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

// A versatile button component for primary, secondary, and destructive actions.
const Button: React.FC<Props> = ({
  label,
  onPress,
  variant = 'default',
  disabled = false,
  loading = false,
  style,
}) => {
  // The button's visual style (e.g., background color) is derived from its variant
  // and defined in the corresponding stylesheet.
  const buttonVariantStyle = styles[`${variant}Button`];

  // The button is dimmed when it's in a disabled or loading state.
  const finalStyle: ViewStyle = {
    ...buttonVariantStyle,
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, finalStyle, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        // Display a spinner when loading, using a color that contrasts with button backgrounds.
        <ActivityIndicator color={themeColors.badgeText} />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;