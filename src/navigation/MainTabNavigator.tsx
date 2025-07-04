import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens for the tabs
import HomeScreen from '@screens/HomeScreen';
import MyMemesScreen from '@screens/MyMemesScreen';
import FavoritesScreen from '@screens/FavouritesScreen';
import TemplatesScreen from '@screens/TemplatesScreen'; // --- IMPORT THE TEMPLATES SCREEN ---

// Global theme colors
import { themeColors } from '@styles/globalStyles/themeColors';

// --- ADD 'Templates' TO THE LIST OF TABS ---
export type TabParamList = {
  Home: undefined;
  Templates: undefined; // The new tab
  'My Memes': undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: themeColors.primary, height: 100 },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: themeColors.card,
          borderTopColor: themeColors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Templates') { // --- ADD ICON LOGIC FOR THE NEW TAB ---
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'My Memes') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'star' : 'star-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* --- ADD THE SCREEN COMPONENT TO THE TAB NAVIGATOR --- */}
      <Tab.Screen name="Templates" component={TemplatesScreen} />
      <Tab.Screen name="My Memes" component={MyMemesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;