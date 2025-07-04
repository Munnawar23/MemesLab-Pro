import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@screens/HomeScreen';
import MyMemesScreen from '@screens/MyMemesScreen';
import FavoritesScreen from '@screens/FavouritesScreen';
import TemplatesScreen from '@screens/TemplatesScreen';
import { themeColors, fonts } from '@styles/globalStyles/themeColors';

// Defines the routes available in the bottom tab navigator.
export type TabParamList = {
  Home: undefined;
  Templates: undefined;
  'My Memes': undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// The navigator component that renders the main bottom tabs of the application.
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      // This function provides a central configuration for all screens in the tab navigator.
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: themeColors.primary,
          height: 100,
        },
        headerTintColor: themeColors.badgeText, // Use light text on the primary background.
        headerTitleStyle: {
          fontFamily: fonts.heading, // Use the heading font for screen titles.
          fontSize: 18,
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.secondaryText, // Use a themed gray for inactive tabs.
        tabBarStyle: {
          backgroundColor: themeColors.card,
          borderTopColor: themeColors.border,
        },
        // This function dynamically determines which icon to display based on the route name and focus state.
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Templates') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'My Memes') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Templates" component={TemplatesScreen} />
      <Tab.Screen name="My Memes" component={MyMemesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;