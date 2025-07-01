import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { styles } from '@styles/screensStyles/SplashScreen.styles';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Main'));
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meme Generator</Text>
    </View>
  );
};

export default SplashScreen;
