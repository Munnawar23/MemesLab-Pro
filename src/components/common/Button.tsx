import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import styles from '@styles/componentStyles/common/Button.styles';

interface Props {
  label: string; // button text
  onPress: () => void; // press handler
  variant?: 'default' | 'secondary' | 'danger'; // button color variant
  disabled?: boolean; // disables press & dims style
  loading?: boolean; // shows spinner
  style?: ViewStyle; // extra styles
}

/**
 * Button Component
 * ---------------------------------------
 * Renders a pressable button with:
 * - label
 * - variant color
 * - optional loading spinner
 * - disabled & custom styles
 */
const Button: React.FC<Props> = ({
  label,
  onPress,
  variant = 'default',
  disabled = false,
  loading = false,
  style,
}) => {
  // Define background color based on variant
  const backgroundColor = styles[`${variant}Button`].backgroundColor;

  // Compose final style
  const finalStyle: ViewStyle = {
    backgroundColor,
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, finalStyle, style]}
      disabled={disabled || loading}
    >
      {/* Show spinner if loading, otherwise label */}
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
