import React from 'react';
import { View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import styles from '@styles/componentStyles/common/ConnectionBanner.styles';

/**
 * ConnectionBanner component
 * - Shows a warning banner when the device has no internet connection
 * - Now uses all styling from the style file (theme included)
 */
const ConnectionBanner = () => {
  const netInfo = useNetInfo();

  if (netInfo.isConnected === false) {
    return (
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          No internet connection. You cannot create or share memes, only view them.
        </Text>
      </View>
    );
  }

  return null;
};

export default ConnectionBanner;
