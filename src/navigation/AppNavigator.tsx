import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import SplashScreen from '@screens/SplashScreen';
import CreateMemeScreen from '@screens/CreateMemeScreen';
import MainTabNavigator from '@navigation/MainTabNavigator';

// Global theme colors
import { themeColors } from '@styles/globalStyles/themeColors';

const Stack = createStackNavigator();

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
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
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
