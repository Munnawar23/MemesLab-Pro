import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '@screens/SplashScreen';
import CreateMemeScreen from '@screens/CreateMemeScreen';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

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
              // The style for the header's title text.
              headerTitleStyle: {
                // Use the heading font to match the style of the main tab screens.
                fontFamily: fonts.heading,
                // Add a specific font size for perfect consistency across all headers.
                fontSize: 18,
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