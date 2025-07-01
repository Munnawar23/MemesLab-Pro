import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@screens/HomeScreen';
import MyMemesScreen from '@screens/MyMemesScreen';
import FavoritesScreen from '@screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icons: Record<string, string> = {
          Home: 'home-outline',
          'My Memes': 'images-outline',
          Favorites: 'star-outline',
        };

        const iconName = icons[route.name] || 'help';

        return {
          headerShown: false, 
          tabBarActiveTintColor: '#ff4c60',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e0e0e0',
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={
                focused
                  ? (iconName.replace('-outline', '') as keyof typeof Ionicons.glyphMap)
                  : (iconName as keyof typeof Ionicons.glyphMap)
              }
              size={size}
              color={color}
            />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Memes" component={MyMemesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
