import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '@screens/SplashScreen';
import CreateMemeScreen from '@screens/CreateMemeScreen';
import { themeColors, fonts } from '../styles/globalStyles/themeColors';

// Defines the routes available in the root stack navigator.
export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Create: { imageUri: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// The primary navigator that orchestrates the app's screen flow.
const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create"
            component={CreateMemeScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: themeColors.primary,
                height: 100,
              },
              headerTintColor: themeColors.badgeText,
              headerTitleStyle: {
                fontFamily: fonts.heading,
                fontSize: 16,
              },
              title: 'Create Meme',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;