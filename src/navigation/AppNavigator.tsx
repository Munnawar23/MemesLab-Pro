import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigators
import MainTabNavigator from './MainTabNavigator';

// Screens
import SplashScreen from '@screens/SplashScreen';
import CreateMemeScreen from '@screens/CreateMemeScreen';
// --- REMOVE THE TemplatesScreen IMPORT, IT'S NO LONGER NEEDED HERE ---

// Global theme colors
import { themeColors } from '@styles/globalStyles/themeColors';

// --- REMOVE 'Templates' FROM THE ROOT STACK PARAMS ---
export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Create: { imageUri: string };
};

const Stack = createStackNavigator<RootStackParamList>();

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
              headerStyle: { backgroundColor: themeColors.primary, height: 100 },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              title: 'Create Meme',
            }}
          />
          {/* --- REMOVE THE TemplatesScreen FROM THE STACK NAVIGATOR --- */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;