import React from 'react';
import { View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import styles from '@styles/componentStyles/common/ConnectionBanner.styles';

// Renders a banner at the top of the screen to inform the user
// when there is no active internet connection.
const ConnectionBanner = () => {
  const netInfo = useNetInfo();

  // The banner is only rendered if the device is determined to be offline.
  if (netInfo.isConnected === false) {
    return (
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          No internet connection. You cannot create or share memes, only view them.
        </Text>
      </View>
    );
  }

  // Render nothing if the connection is active.
  return null;
};

export default ConnectionBanner;